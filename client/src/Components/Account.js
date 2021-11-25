import { UserContext } from "../UserContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

const Account = ({ authenticated }) => {
  const [likes, setLikes] = useState();
  const [userdb, setUser] = useState();
  const [listings, setListings] = useState();
  const { user } = UserContext();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      setUser(data.rows[0]);
    };
    getUser();
    const getListings = async () => {
      const { data } = await axios.get(`/api/listings/user/${id}`);
      setListings(data.rows);
    };
    getListings();
    const getLikes = async () => {
      const result = await axios.get(`/api/likes/${user.userId}`);
      setLikes(result.data.rows);
    };
    if (user.userId) getLikes();
  }, [id, user.userId]);



  if (user.userId !== parseInt(id)) {
    return (
      <div class="container mt-5">
        <div class="col-12 mb-4">
          <div class="row">
            <i
              class="fas fa-user-circle col-12 text-center"
              style={{ fontSize: "70px" }}
            ></i>
            <h1 class="col-12 text-center mt-3">{userdb?.username}</h1>
          </div>
        </div>
        <h3 class="mb-4">Listings</h3>
        <div class="row">
          {listings?.map((x) => (
            <div class={`col-lg-3 mb-3`}>
              <Card
                data={x}
                setData={(a) => setListings(listings.filter((b) => b.id !== a))}
                likes={likes}
                setLikes={(likes) => setLikes(likes)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (

      <div class='container mt-5'>
              <div class="col-12 mb-4">
        <div class="row">
          <i
            class="fas fa-user-circle col-12 text-center"
            style={{ fontSize: "70px" }}
          ></i>
          <h1 class="col-12 text-center mt-3">{userdb?.username}</h1>
        </div>
      </div>
      <ul class="nav nav-tabs nav-justified mb-5 justify-content-center">
        <li class="nav-item mr-3">
        <div class="nav-link active" aria-current="page">
            <Link to='' style={{color: '#212529', textDecoration: 'none'}}><span>Listings</span></Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link" aria-current="page">
            <Link to='favorites' style={{color: '#212529', textDecoration: 'none'}}><span>Favorites</span></Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link" aria-current="page">
            <Link to='offersReceived' style={{color: '#212529', textDecoration: 'none'}}><span>Offers Received</span></Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link" aria-current="page">
            <Link to='offersPending' style={{color: '#212529', textDecoration: 'none'}}><span>Offers Sent</span></Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link" aria-current="page">
            <Link to='offersCompleted' style={{color: '#212529', textDecoration: 'none'}}><span>Offers Completed</span></Link>
          </div>
        </li>
      </ul>
      <h3 class="mb-4">Listings</h3>
        <div class="row">
          {listings?.map((x) => (
            <div class={`col-lg-3 mb-3`}>
              <Card
                data={x}
                setData={(a) => setListings(listings.filter((b) => b.id !== a))}
                likes={likes}
                setLikes={(likes) => setLikes(likes)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Account;
