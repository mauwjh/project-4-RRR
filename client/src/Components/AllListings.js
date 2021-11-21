import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { UserContext } from "../UserContext";
import Card from "./Card";
import { useAuthenticate } from "../Store/UseAuthenticate";

const AllListings = () => {
  const userContext = useContext(UserContext);
  const { category, cid } = useParams();
  const [listings, setListings] = useState();
  const [likes, setLikes] = useState();
  const [limit, setLimit] = useState(8)

  useAuthenticate()

  useEffect(() => {
    const getListings = async () => {
      const { data } = await axios.get(`/api/listings/categories/${cid}/${limit}`);
      setListings(data.rows);
    };
    getListings();
    const getLikes = async () => {
      const result = await axios.get(`/api/likes/${userContext.user.userId}`);
      setLikes(result.data.rows);
    };
    if (userContext.user.userId) getLikes();
  }, [cid, userContext.user.userId, limit]);

  console.log(listings);
  console.log(likes)

  return (
    <div class="container mt-4 mb-5">
      <h2 class='mb-3'>Listings in {category}</h2>
      <div class="row">
        {listings?.map((x) => (
          <div class={`col-md-3 mb-3`}>
            <Card data={x} likes={likes} setLikes={(likes) => setLikes(likes)} />
          </div>
        ))}
      </div>
      <div class='row mt-4'>
        <button class='btn btn-info btn-md mr-auto ml-auto' onClick={() => setLimit(limit+8)}>Show more</button>
      </div>
    </div>
  );
};

export default AllListings;
