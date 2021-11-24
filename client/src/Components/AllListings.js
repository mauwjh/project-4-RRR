import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { UserContext } from "../UserContext";
import Card from "./Card";

const AllListings = () => {
  const {user} = UserContext()
  const { category, cid } = useParams();
  const [listings, setListings] = useState();
  const [likes, setLikes] = useState();
  const [limit, setLimit] = useState(8)

  useEffect(() => {
    const getListings = async () => {
      const { data } = await axios.get(`/api/listings/categories/${cid}/${limit}`);
      setListings(data.rows);
    };
    getListings();
    const getLikes = async () => {
      const result = await axios.get(`/api/likes/${user.userId}`);
      setLikes(result.data.rows);
    };
    if (user.userId) getLikes();
  }, [cid, user.userId, limit]);

  console.log(listings);
  console.log(likes)

  return (
    <div class="container mt-4 mb-5">
      <h2 class='mb-4'>Listings in {category}</h2>
      <div class="row">
        {listings?.map((x) => (
          <div class={`col-lg-3 mb-3`}>
            <Card data={x} setData={a => setListings(listings.filter(b => b.id !== a))} likes={likes} setLikes={(likes) => setLikes(likes)} />
          </div>
        ))}
      </div>
      <div class='row mt-4'>
        <button class='btn btn-info btn-md mr-auto ml-auto' style={{boxShadow: "none", outline: "none"}} onClick={() => setLimit(limit+8)}>Show more</button>
      </div>
    </div>
  );
};

export default AllListings;
