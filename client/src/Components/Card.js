import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

const Card = ({ data, likes, setLikes, setData }) => {
  const navigate = useNavigate();
  const { user } = UserContext();
  const [listingLikes, setListingLikes] = useState();

  useEffect(() => {
    const getListingLikes = async () => {
      const result = await axios.get(`/api/likes/listing/${data.id}`);
      setListingLikes(result.data.rows.length);
    };
    getListingLikes();
  }, [data.id]);

  const deleteListing = async () => {
    const res = await axios.delete(`/api/listings/${data.id}`)
    setData(data.id)
    console.log(res)
  }
  
  const like = () => {
    if (!user?.authenticated) {
      navigate("/login");
    } else if (user.authenticated) {
      axios
        .post("/api/likes/", {
          user_id: user?.userId,
          listing_id: data.id,
        })
        .then((res) => {
          const newLikes = [...likes, { listing_id: data.id }];
          setLikes(newLikes);
          setListingLikes(listingLikes + 1);
        });
    }
  };

  const unlike = () => {
    if (!user?.authenticated) {
      navigate("/login");
    } else if (user.authenticated) {
      axios
        .delete("/api/likes/delete", {
          data: {
            user_id: user?.userId,
            listing_id: data.id,
          },
        })
        .then((res) => {
          console.log(res);
          const newLikes = likes.filter((x) => x.listing_id !== data.id);
          setLikes(newLikes);
          setListingLikes(listingLikes - 1);
        });
    }
  };

  const likeIcon = () => {
    if (!likes) {
      return (
        <div class="card-body">
          <i
            class="far fa-heart"
            onClick={like}
            style={{ cursor: "pointer" }}
          ></i>
          <span style={{ marginLeft: "10px" }}>{listingLikes}</span>
        </div>
      );
    } else if (likes?.map((a) => a.listing_id).indexOf(data.id) !== -1) {
      return (
        <div
          class="col-9"
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          <i
            class="fas fa-heart"
            onClick={unlike}
            style={{ cursor: "pointer", color: "red" }}
          ></i>
          <span style={{ marginLeft: "10px" }}>{listingLikes}</span>
        </div>
      );
    } else {
      return (
        <div
          class="col-9"
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          <i
            class="far fa-heart"
            onClick={like}
            style={{ cursor: "pointer" }}
          ></i>
          <span style={{ marginLeft: "10px" }}>{listingLikes}</span>
        </div>
      );
    }
  };

  const dropdown = () => {
    if(user.userId === data.creator_id) {
      return(
      <div class="dropdown col-3 text-right" style={{ padding: 0, paddingRight: 8}}>
      <button
        class="btn"
        type='button'
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ boxShadow: "none", outline: "none" }}
      >
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
        <li>
          <Link to={`/listings/edit/${data.id}`} style={{color: 'black', textDecoration: 'none'}}><div  class="dropdown-item">
            Edit
          </div></Link>
        </li>
        <li>
          <button class="dropdown-item" onClick={() => deleteListing()}>
            Delete
          </button>
        </li>
      </ul>
    </div>
      )
    }
  }

  return (
    <div class="card">
      <div class="card-header" style={{ minHeight: "60px", height: "60px" }}>
        <div
          style={{
            fontWeight: "bold",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
          class="row"
        >
          <i class="fas fa-user-circle col-1" style={{ fontSize: "30px" }}></i>
          <div style={{ fontWeight: "normal", paddingLeft: 25 }} class="col-10">
            <Link
              to={`/account/${data.creator_id}`}
              style={{ fontSize: "18px", lineHeight: "18px" }}
            >
              {data.users_username}
            </Link>
          </div>
        </div>
      </div>
      <Link to={`/listings/${data.id}`}>
        <img
          class="img-fluid"
          style={{
            objectFit: "cover",
            minHeight: "230px",
            maxHeight: "230px",
            boxSizing: "border-box",
            width: "100%",
          }}
          alt="100%x280"
          src={data.img[0]}
        />
      </Link>
      <div
        class="card-body"
        style={{
          minHeight: "120px",
          maxHeight: "120px",
          textDecoration: "none",
          color: "black",
        }}
      >
        <Link to={`/listings/${data.id}`}>
          <h4 class="card-title" style={{ fontSize: "18px", color: "black" }}>
            {data.title}
          </h4>
        </Link>
        <p class="card-text" style={{ maxHeight: "50px", fontSize: "17px" }}>
          {data.sale_option}
          <br />
          in{" "}
          <Link to={`/listings/${data.categories_name}/${data.categories_id}`}>
            {data.categories_name}
          </Link>
        </p>
      </div>
      <div class="col-12 mt-3 mb-2" style={{minHeight: '38px'}}>
        <div class="row" style={{display: 'flex'}}>
          {likeIcon()}
          {dropdown()}
        </div>
      </div>
    </div>
  );
};

export default Card;
