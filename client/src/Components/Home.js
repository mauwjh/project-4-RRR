import Carousel from "./Carousel";
import {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import {UserContext} from '../UserContext'
import { useAuthenticate } from "../Store/UseAuthenticate";

const Home = () => {
  const [categoryList, setCategoryList] = useState([])
  const categories = [1,5,12];
  const userContext = useContext(UserContext)

  const getCategories = async () => {
    const result = await axios.get('/api/categories')
    setCategoryList(result.data.rows)
  }

  useAuthenticate()

  useEffect(() => {
    getCategories()
  }, [])

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
            {userContext?.user?.authenticated ? null : <Link to ='/login'><a class="btn btn-info btn-md mr-2 mb-2" style={{width: '110px', boxShadow: 'none', outline: 'none'}} href="#asd" role="button">
              Sign-In
            </a></Link>}
            <a class="btn btn-info btn-md mr-2 mb-2" style={{width: '110px', boxShadow: 'none', outline: 'none'}} href="#asd" role="button">
              Learn more
            </a>
          </p>
        </div>
      </div>
      <div class="container">
        <h2>Recommended For You</h2>
      </div>
      {categoryList?.filter(x => categories.indexOf(x.id) !== -1)?.map((x) => (
        <Carousel category={x.name} />
      ))}
    </>
  );
};

export default Home;
