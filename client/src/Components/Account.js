import { UserContext } from "../UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Card from "./Card";

const Account = () => {
  const [likes, setLikes] = useState();
  const [user, setUser] = useState();
  const [listings, setListings] = useState();
  const userContext = useContext(UserContext);
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
      const result = await axios.get(`/api/likes/${userContext.user.userId}`);
      setLikes(result.data.rows);
    };
    if (userContext.user.userId) getLikes();
  }, [id, userContext.user.userId]);

  console.log(listings);

  return (
    <div class="container mt-5">
      <div class="col-12 mb-4">
        <div class="row">
          <i
            class="fas fa-user-circle col-12 text-center"
            style={{ fontSize: "70px" }}
          ></i>
          <h1 class="col-12 text-center mt-3">{user?.username}</h1>
        </div>
      </div>
      <h3 class="mb-4">Listings</h3>
      <div class="row">
        {listings?.map((x) => (
          <div class={`col-lg-3 mb-3`}>
            <Card
              data={x}
              likes={likes}
              setLikes={(likes) => setLikes(likes)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;