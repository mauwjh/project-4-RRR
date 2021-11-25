import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Transact = ({ authenticated }) => {
  const { id } = useParams();
  const [buyerListings, setBuyerListings] = useState();
  const [sellerListing, setSellerListing] = useState();
  const [offers, setOffers] = useState()
  const { user } = UserContext();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
    const getOffers = async () => {
      const result = await axios.get(`/api/offers/user/${user.userId}`)
      setOffers(result.data.rows)
    }
    if(user.userId) getOffers()
    const getBuyerListings = async () => {
      const { data } = await axios.get(`/api/listings/user/${user.userId}`);
      setBuyerListings(data.rows);
      console.log(data.rows);
    };
    if (user.userId) getBuyerListings();
    const getSellerListing = async () => {
      const { data } = await axios.get(`/api/listings/${id}`);
      setSellerListing(data.rows[0]);
    };
    getSellerListing();
  }, [id, user, authenticated, navigate]);

  console.log(offers)

  const saveOffer = async (buyerListing) => {
    console.log({
      buyerId: buyerListing.creator_id,
      sellerId: sellerListing.creator_id,
      buyerListing: buyerListing.id,
      sellerListing: sellerListing.id,
    });

    const result = await axios.post("/api/offers", {
      buyerId: buyerListing.creator_id,
      sellerId: sellerListing.creator_id,
      buyerListing: buyerListing.id,
      sellerListing: sellerListing.id,
    });
    console.log(result)
    if(result.status === 200) {
      navigate(`/account/${user.userId}`)
    }
  };

  if (buyerListings?.filter(listing => offers?.filter(offer => offer.closed === 'accepted').reduce((a,b) => [b.buyerlistings_id, b.sellerlistings_id].concat(a),[]).indexOf(listing.id) === -1)?.length > 0) {
    return (
      <div class="container">
        <h2 class="text-center mt-5 mb-5">Your Exchange Options</h2>
        <div class="row">
          {buyerListings?.filter(listing => offers?.filter(offer => offer.closed === 'accepted').reduce((a,b) => [b.buyerlistings_id, b.sellerlistings_id].concat(a),[]).indexOf(listing.id) === -1).map((x) => (
            <div class="card col-12 mb-5">
              <div class="card-body">
                <div class="row">
                  <div class="col-5">
                    <div class="card-header text-center">
                      {x.users_username}
                    </div>
                    <img class="card-img" src={x.img[0]} alt="product" />
                    <div class="card-body text-center pl-0 pr-0">{x.title}</div>
                  </div>
                  <div class="col-2 d-flex flex-column h-100 align-items-center mt-auto mb-auto">
                    <div style={{ fontSize: "25px" }}>
                      <i class="fas fa-exchange-alt"></i>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="card-header text-center">
                      {sellerListing?.users_username}
                    </div>
                    <img
                      class="card-img"
                      src={sellerListing?.img[0]}
                      alt="product"
                    />
                    <div class="card-body text-center pl-0 pr-0">
                      {sellerListing?.title}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <button
                    class="btn btn-primary mt-3 col-12 mx-auto"
                    onClick={() => saveOffer(x)}
                  >
                    Offer Exchange
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          style={{
            maxHeight: "400px",
            height: "400px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1568307970720-a8c50b644a7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div class="container">
          <h1 class="text-center">Oops! You have no available listings to exchange</h1>
          <h4 class="text-center">
            <Link to="/listings/new">
              <span>Create a new listing here!</span>
            </Link>
          </h4>
        </div>
      </>
    );
  }
};

export default Transact;
