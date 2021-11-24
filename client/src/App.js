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
          <Route path="account/:id" element={<Account/>} />
          <Route path="listings/edit/:id" element={<EditListing authenticated={user.authenticated} userId={user.userId}/>} />
          <Route path="listings/new" element={<CreateListing authenticated={user.authenticated} />} />
          <Route path="listings/:id" element={<ViewListing />} />
          <Route path="listings/:category/:cid" element={<AllListings />} />
        </Routes>
      </div>
  );
}

export default App;
