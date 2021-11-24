import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Card from "./Card";

const ViewListing = () => {
  const [listing, setListing] = useState();
  const navigate = useNavigate();
  const {user} = UserContext()
  const [likes, setLikes] = useState();
  const [listingLikes, setListingLikes] = useState();
  const [categoryList, setCategoryList] = useState();
  const [similarListings, setSimilarListings] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get("/api/categories");
      setCategoryList(result.data.rows);
    };
    getCategories();
    const getListing = async () => {
      const { data } = await axios.get(`/api/listings/${id}`);
      setListing(data.rows[0]);
    };
    getListing();
    const getListingLikes = async () => {
      const result = await axios.get(`/api/likes/listing/${listing.id}`);
      setListingLikes(result.data.rows.length);
    };
    if (listing?.id) getListingLikes();
    const getSimilarListings = async () => {
      const { data } = await axios.get(
        `/api/listings/categories/${listing.categories_id}/12`
      );
      setSimilarListings(data.rows);
    };
    if (listing?.categories_id) getSimilarListings();
    const getLikes = async () => {
      const result = await axios.get(`/api/likes/${user.userId}`);
      setLikes(result.data.rows);
    };
    if (user.userId) getLikes();
  }, [id, listing?.id, user.userId, listing?.categories_id]);

  console.log(listing);

  const like = () => {
    if (!user?.authenticated) {
      navigate("/login");
    } else if (user.authenticated) {
      axios
        .post("/api/likes/", {
          user_id: user?.userId,
          listing_id: listing.id,
        })
        .then((res) => {
          setListingLikes(listingLikes + 1);
          setLikes([...likes, { listing_id: listing.id }]);
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
            listing_id: listing.id,
          },
        })
        .then((res) => {
          console.log(res);
          const newLikes = likes.filter((x) => x.listing_id !== listing.id);
          setListingLikes(listingLikes - 1);
          setLikes(newLikes);
        });
    }
  };

  const likeIcon = () => {
    if (!likes) {
      return (
        <>
          <i
            class="far fa-heart"
            onClick={like}
            style={{ cursor: "pointer" }}
          ></i>
          <span style={{ marginLeft: "10px", fontSize: "17px" }}>
            {listingLikes} {listingLikes === 1 ? "like" : "likes"}
          </span>
        </>
      );
    } else if (likes?.map((a) => a.listing_id).indexOf(listing?.id) !== -1) {
      return (
        <>
          <i
            class="fas fa-heart"
            onClick={unlike}
            style={{ cursor: "pointer", color: "red" }}
          ></i>
          <span style={{ marginLeft: "10px", fontSize: "17px" }}>
            {listingLikes} {listingLikes === 1 ? "like" : "likes"}
          </span>
        </>
      );
    } else {
      return (
        <>
          <i
            class="far fa-heart"
            onClick={like}
            style={{ cursor: "pointer" }}
          ></i>
          <span style={{ marginLeft: "10px", fontSize: "17px" }}>
            {listingLikes} {listingLikes === 1 ? "like" : "likes"}
          </span>
        </>
      );
    }
  };

  const saleIcon = () => {
    if (listing?.sale_option === "For Free") {
      return (
        <div class="col-md-2 mr-3">
          <i
            class="fas fa-hand-holding-heart mr-3 mb-3"
            style={{ color: "grey", fontSize: "18px" }}
          ></i>
          {listing?.sale_option}
        </div>
      );
    } else {
      return (
        <div class="col-md-2 mr-3">
          <i
            class="fas fa-people-carry mr-3 mb-3"
            style={{ color: "grey", fontSize: "21px" }}
          ></i>
          {listing?.sale_option}
        </div>
      );
    }
  };

  return (
    <>
      <div class="container">
        <div class="header mt-5 mb-4 text-center">
          <h2>{listing?.title}</h2>
        </div>
        <div class="container">
          <div class="text-right mb-3">{likeIcon()}</div>
        </div>
        <div id="listingCarousel" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            {listing?.img?.map((x, y) => (
              <li
                data-target={`#${y}`}
                data-slide-to="0"
                class={y === 0 ? "active" : null}
              ></li>
            ))}
          </ol>
          <div class="carousel-inner">
            {listing?.img?.map((x, y) => (
              <div class={`carousel-item ${y === 0 ? "active" : null}`}>
                <img class="d-block w-100" src={x} alt="First slide" />
              </div>
            ))}
          </div>
          <a
            class={`carousel-control-prev ${
              listing?.img?.length === 1 ? "d-none" : null
            }`}
            href="#listingCarousel"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class={`carousel-control-next ${
              listing?.img?.length === 1 ? "d-none" : null
            }`}
            href="#listingCarousel"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="container">
          <div class="row mt-3 no-gutters">
            {saleIcon()}
            {listing?.price ? (
              <div class="col-md-2 mr-3 mb-3">
                <i
                  class="fas fa-dollar-sign  mr-3"
                  style={{ color: "grey", fontSize: "18px" }}
                ></i>
                <span>{listing.price}</span>
              </div>
            ) : null}
            <div class="col-md-3 mr-3">
              <i
                class="fas fa-list mr-3 mb-3"
                style={{ color: "grey", fontSize: "18px" }}
              ></i>
              <Link
                to={`/listings/${listing?.categories_name}/${listing?.categories_id}`}
              >
                <span style={{ color: "black" }}>
                  {listing?.categories_name}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="body mt-4 mb-4">
              <p style={{ fontSize: "25px" }}>{listing?.title}</p>
            </div>
            <div class="body mt-4 mb-4">
              <h5 class="">Description</h5>
              <p>{listing?.description}</p>
            </div>
            {listing?.looking_for ? (
              <div class="body mt-4 mb-2">
                <h5 class="">Looking To Exchange With</h5>
                <div class="col-12">
                  <div class="row">
                    {listing?.looking_for?.map((x) => (
                      <div
                        class="col-sm-4 text-nowrap text-center mr-2 mb-2 mt-1 text-white"
                        style={{
                          borderRadius: "18px",
                          height: "30px",
                          minWidth: "max-content",
                          backgroundColor: "#43aa8b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {categoryList?.map((y) => (y.id === x ? y.name : null))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div class="col-md-4">
            <div
              style={{ fontWeight: "bold" }}
              class=" align-middle mt-4"
            >
              <i
                class="fas fa-user-circle mr-3 align-middle mt-1"
                style={{ fontSize: "30px" }}
              ></i>
              <div
                style={{ fontWeight: "normal" }}
                class="d-inline align-middle"
              >
                {listing?.users_username}
              </div>
            </div>
            <button class="btn btn-primary btn-md btn-block mt-3 mb-3">Exchange</button>
          </div>
        </div>
        <h4 class="mb-3 mt-5">Listings You Might Be Interested In</h4>
        <div class="row">
          {similarListings?.map((x) => (
            <div class={`col-lg-3 mb-3`}>
              <Card
                data={x}
                setData={(a) => setSimilarListings(similarListings.filter(b => b.id !== a))}
                likes={likes}
                setLikes={(likes) => setLikes(likes)}
              />
            </div>
          ))}
        </div>
        <div class="row mt-4 mb-5">
          <Link
            to={`/listings/${listing?.categories_name}/${listing?.categories_id}`}
            style={{ marginRight: "auto", marginLeft: "auto" }}
          >
            <button
              class="btn btn-primary btn-md"
              style={{ boxShadow: "none", outline: "none" }}
            >
              Show more
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ViewListing;
