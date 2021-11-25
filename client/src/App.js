import { UserContext } from "./UserContext";
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import AllListings from "./Components/AllListings";
import CreateListing from "./Components/CreateListing";
import ViewListing from "./Components/ViewListing";
import Account from "./Components/Account";
import EditListing from "./Components/EditListing";
import Transact from "./Components/Transact";
import Favorites from "./Components/Favorites";
import OffersReceived from "./Components/OffersReceived";
import OffersPending from "./Components/OffersPending";
import OffersCompleted from "./Components/OffersCompleted";
import AboutUs from "./Components/AboutUs";

function App() {
  const {user, useAuthenticate} = UserContext()

  useAuthenticate()
  console.log(user)
  
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="aboutus" element={<AboutUs/>} />
          <Route path="account/:id/offersReceived" element={<OffersReceived/>} />
          <Route path="account/:id/offersPending" element={<OffersPending/>} />
          <Route path="account/:id/offersCompleted" element={<OffersCompleted/>} />
          <Route path="account/:id/favorites" element={<Favorites/>} />
          <Route path="account/:id" element={<Account/>} />
          <Route path="listings/edit/:id" element={<EditListing authenticated={user.authenticated} userId={user.userId}/>} />
          <Route path="listings/new" element={<CreateListing authenticated={user.authenticated} />} />
          <Route path="listings/:id/transact" element={<Transact authenticated={user.authenticated}/>} />
          <Route path="listings/:id" element={<ViewListing />} />
          <Route path="listings/:category/:cid" element={<AllListings />} />
        </Routes>
      </div>
  );
}

export default App;
