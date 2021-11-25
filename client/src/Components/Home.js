import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import CategoriesCarousel from "./CategoriesCarousel";
import Card from "./Card";

const Home = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [audioListings, setAudioListings] = useState()
  const [audioLimit, setAudioLimit] = useState(6)
  const [likes, setLikes] = useState([]);
  const [recentListings, setRecentListings] = useState();
  const [mostLiked, setMostLiked] = useState()
  const [limit, setLimit] = useState(5)
  const {user} = UserContext();

  useEffect(() => {
    const getListings = async () => {
      const { data } = await axios.get(`/api/listings/categories/1/${audioLimit}`);
      setAudioListings(data.rows);
    };
    getListings();
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
      const result = await axios.get(`/api/likes/${user.userId}`);
      setLikes(result.data.rows);
    };
    if (user.userId) getLikes();
    const getMostLiked = async () => {
      const result = await axios.get(`api/likes/mostLiked/12`)
      setMostLiked(result.data.rows)
    }
    getMostLiked()
  }, [user.userId, audioLimit]);

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
            {user?.authenticated ? null : (
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
              <Link to="/aboutus">
            <a
              class="btn btn-primary btn-md mr-2 mb-2"
              style={{ width: "110px", boxShadow: "none", outline: "none" }}
              href="#asd"
              role="button"
            >
              About Us

            </a>
            </Link>
          </p>
        </div>
      </div>

      <div class="container">
        <h2>Recommended For You</h2>
      </div>
      <Carousel
        header="Most Recent"
        likes={likes}
        data={recentListings}
        setData={(x) => setRecentListings(recentListings.filter(y => y.id !== x))}
        cols={3}
        setLikes={(listing) => setLikes(listing)}
        search='recent'
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
      {console.log(mostLiked)}
      <Carousel
        header="Most Liked"
        likes={likes}
        data={mostLiked}
        setData={(x) => setMostLiked(recentListings.filter(y => y.id !== x))}
        cols={4}
        setLikes={(listing) => setLikes(listing)}
        search='liked'
      />
    <div class="container mt-4 mb-5">
      <h2 class='mb-4'>Popular Categories</h2>
      <h4 class='mb-4'>Audio</h4>
      <div class="row">
        {audioListings?.map((x) => (
          <div class={`col-lg-4 mb-3`}>
            <Card data={x} setData={a => setAudioListings(audioListings.filter(b => b.id !== a))} likes={likes} setLikes={(likes) => setLikes(likes)} />
          </div>
        ))}
      </div>
      <div class='row mt-4'>
        <button class='btn btn-primary btn-md mr-auto ml-auto' style={{boxShadow: "none", outline: "none"}} onClick={() => setAudioLimit(audioLimit+6)}>Show more</button>
      </div>
    </div>
    </>
  );
};

export default Home;
