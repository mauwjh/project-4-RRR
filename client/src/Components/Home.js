import Carousel from "./Carousel";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useAuthenticate } from "../Store/UseAuthenticate";
import CategoriesCarousel from "./CategoriesCarousel";

const Home = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [likes, setLikes] = useState([]);
  const [recentListings, setRecentListings] = useState();
  const [limit, setLimit] = useState(5)
  const userContext = useContext(UserContext);

  useAuthenticate();

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios.get("/api/categories");
      setCategoryList(result.data.rows);
    };
    getCategories();
    const getRecentListings = async () => {
      const result = await axios.get("/api/listings/recent");
      setRecentListings(result.data.rows);
    };
    getRecentListings();
    const getLikes = async () => {
      const result = await axios.get(`/api/likes/${userContext.user.userId}`);
      setLikes(result.data.rows);
    };
    if (userContext.user.userId) getLikes();
  }, [userContext.user.userId]);

  console.log(recentListings);
  console.log(likes);

  return (
    <>
      <div
        class="jumbotron jumbotron-fluid"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1551970634-747846a548cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3540&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div class="container" style={{ padding: "5em" }}>
          <h1 class="display-4">Reduce, Reuse, Recycle</h1>
          <p class="lead">
            One man's trash is another man's treasure. <br />
            R3 is a community driven marketplace with the environmentally
            conscious goal of reducing waste. We hope to promote the exchange of
            goods through barter transactions to give pre-loved items a second
            life.
          </p>
          <hr class="my-4" style={{ borderColor: "white" }} />
          <p>Find out more and connect with your barter buddy today</p>
          <p class="lead">
            {userContext?.user?.authenticated ? null : (
              <Link to="/login">
                <a
                  class="btn btn-primary btn-md mr-2 mb-2"
                  style={{ width: "110px", boxShadow: "none", outline: "none" }}
                  href="#asd"
                  role="button"
                >
                  Sign-In
                </a>
              </Link>
            )}
            <a
              class="btn btn-primary btn-md mr-2 mb-2"
              style={{ width: "110px", boxShadow: "none", outline: "none" }}
              href="#asd"
              role="button"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>

      <div class="container">
        <h2>Recommended For You</h2>
      </div>
      <Carousel
        header="New Listings"
        likes={likes}
        data={recentListings}
        cols={3}
        setLikes={(listing) => setLikes(listing)}
      />

      <CategoriesCarousel data={categoryList} cols={6}/> 

      <div class="container mb-5 d-md-none">
        <h2 class="mb-3">Categories</h2>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "normal",
                  marginLeft: "5px",
                  marginBottom: "15px"
                }}
                onClick={() => setLimit(categoryList.length)}
              >
                View All {">"}
              </div>
        <ul class="list-group">
          {categoryList.slice(0, limit).map((x) => (
            <Link to={`/listings/${x.name}/${x.id}`}><li class="list-group-item" style={{ fontSize: "15px" }}>
              {x.name}
            </li></Link>
          ))}
        </ul>
      </div>
      <Carousel
        header="Most Liked"
        likes={likes}
        data={recentListings}
        cols={4}
        setLikes={(listing) => setLikes(listing)}
      />
    </>
  );
};

export default Home;
