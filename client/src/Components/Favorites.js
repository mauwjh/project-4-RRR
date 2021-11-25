import { UserContext } from "../UserContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

const Favorites = ({ authenticated }) => {
  const [likes, setLikes] = useState();
  const [favorites, setFavorites] = useState();
  const [userdb, setUser] = useState();
  const { user } = UserContext();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      setUser(data.rows[0]);
    };
    getUser();
    const getLikes = async () => {
      const result = await axios.get(`/api/likes/${user.userId}`);
      setLikes(result.data.rows);
    };
    if (user.userId) getLikes();
    const getFavorites = async () => {
      const result = await axios.get(`/api/likes/${user.userId}/allListings`);
      setFavorites(result.data.rows);
    };
    if (user.userId) getFavorites();
  }, [id, user.userId]);

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
      <ul class="nav nav-tabs nav-justified mb-5 justify-content-center">
        <li class="nav-item mr-3">
          <div class="nav-link" aria-current="page">
            <Link
              to={`/account/${user.userId}`}
              style={{ color: "#212529", textDecoration: "none" }}
            >
              <span>Listings</span>
            </Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link active" aria-current="page">
            <Link
              to={`/account/${user.userId}/favorites`}
              style={{ color: "#212529", textDecoration: "none" }}
            >
              <span>Favorites</span>
            </Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link" aria-current="page">
            <Link
              to={`/account/${user.userId}/offersReceived`}
              style={{ color: "#212529", textDecoration: "none" }}
            >
              <span>Offers Received</span>
            </Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link" aria-current="page">
            <Link
              to={`/account/${user.userId}/offersPending`}
              style={{ color: "#212529", textDecoration: "none" }}
            >
              <span>Offers Sent</span>
            </Link>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-link" aria-current="page">
            <Link
              to={`/account/${user.userId}/offersCompleted`}
              style={{ color: "#212529", textDecoration: "none" }}
            >
              <span>Offers Completed</span>
            </Link>
          </div>
        </li>
      </ul>
      <h3 class="mb-4">Favorites</h3>
      <div class="row">
        {favorites?.map((x) => (
          <div class={`col-lg-3 mb-3`}>
            <Card
              data={x}
              setData={(a) => setFavorites(favorites.filter((b) => b.id !== a))}
              likes={likes}
              setLikes={(likes) => setLikes(likes)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
