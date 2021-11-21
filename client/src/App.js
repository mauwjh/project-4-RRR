import { UserContext } from "./UserContext";
import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import AllListings from "./Components/AllListings";
// import { useAuthenticate } from './Store/UseAuthenticate';

function App() {
  const [user, setUser] = useState({ authenticated: false, userData: {} });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="listings/:category/:cid" element={<AllListings />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
