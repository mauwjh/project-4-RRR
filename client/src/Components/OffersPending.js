import { UserContext } from "../UserContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const OffersPending = ({ authenticated }) => {
  const [offers, setOffers] = useState();
  const [userdb, setUser] = useState();
  const { user } = UserContext();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      setUser(data.rows[0]);
    };
    getUser();
    // const getLikes = async () => {
    //   const result = await axios.get(`/api/likes/${user.userId}`);
    //   setLikes(result.data.rows);
    // };
    // if (user.userId) getLikes();
    const getOffers = async () => {
      const result = await axios.get(`/api/offers/buyer/${user.userId}`);
      setOffers(result.data.rows);
      console.log(result);
    };
    if (user.userId) getOffers();
  }, [id, user.userId]);

  const buttonRender = (status) => {
    if(status === 'accepted') {
      return(
        <button class="btn btn-success mt-3 col-12 mx-auto disabled">
         Accepted
      </button>
      )
    } else if(status === 'deleted') {
      return(
        <button class="btn btn-dark mt-3 col-12 mx-auto disabled">
         Listing Closed
      </button>
      )
    } else if(status === 'declined') {
      return(
      <button class="btn btn-danger mt-3 col-12 mx-auto disabled">
         Declined
      </button>
      )
    } else {
      return(
      <button class="btn btn-primary mt-3 col-12 mx-auto disabled">
         Awaiting Response
      </button>
      )
    }
  }

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
          <div class="nav-link" aria-current="page">
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
          <div class="nav-link active" aria-current="page">
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
      <h3 class="mb-4">Offers You Have Sent</h3>
      <div class="row">
        {offers?.map((x) => (
          <div class="card col-12 mb-5">
            <div class="card-body">
              <div class="row">
                <div class="col-5">
                  <div class="card-header text-center">{x.buyer_username}</div>
                  <img
                    class="card-img"
                    src={x.buyerlistings_img[0]}
                    alt="product"
                  />
                  <div class="card-body text-center pl-0 pr-0">
                    {x.buyerlistings_title}
                  </div>
                </div>
                <div class="col-2 d-flex flex-column h-100 align-items-center mt-auto mb-auto">
                  <div style={{ fontSize: "25px" }}>
                    <i class="fas fa-exchange-alt"></i>
                  </div>
                </div>
                <div class="col-5">
                  <div class="card-header text-center">{x.seller_username}</div>
                  <img
                    class="card-img"
                    src={x.sellerlistings_img[0]}
                    alt="product"
                  />
                  <div class="card-body text-center pl-0 pr-0">
                    {x.sellerlistings_title}
                  </div>
                </div>
              </div>
              <div class="row">
                {buttonRender(x.closed)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPending;
