import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

const Card = ({ data, likes, setLikes }) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [listingLikes, setListingLikes] = useState();

  useEffect(() => {
    const getListingLikes = async () => {
      const result = await axios.get(`/api/likes/listing/${data.id}`);
      setListingLikes(result.data.rows.length);
    };
    getListingLikes();
  }, [data.id]);

  const like = () => {
    if (!userContext?.user?.authenticated) {
      navigate("/login");
    } else if (userContext.user.authenticated) {
      axios
        .post("/api/likes/", {
          user_id: userContext?.user?.userId,
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
    if (!userContext?.user?.authenticated) {
      navigate("/login");
    } else if (userContext.user.authenticated) {
      axios
        .delete("/api/likes/delete", {
          data: {
            user_id: userContext?.user?.userId,
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
        <div class="card-body">
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
        <div class="card-body">
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

  return (
    <div class="card">
      <div class="card-header">
        <div style={{ fontWeight: "bold" }}>{data.users_username}</div>
      </div>
      <img
        class="img-fluid"
        style={{ objectFit: "cover", minHeight: "230px", maxHeight: "230px" }}
        alt="100%x280"
        src={data.img}
      />
      <div class="card-body" style={{ minHeight: "120px", maxHeight: "120px" }}>
        <h4 class="card-title" style={{ fontSize: "18px" }}>
          {data.title}
        </h4>
        <p class="card-text" style={{ maxHeight: "50px", fontSize: "17px" }}>
          {data.sale_option}
          <br />
          in{" "}
          <Link to={`/listings/${data.categories_name}/${data.categories_id}`}>
            {data.categories_name}
          </Link>
        </p>
      </div>
      {likeIcon()}
    </div>
  );
};

export default Card;
