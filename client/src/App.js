import {UserContext} from './UserContext'
import React, {useState} from 'react'
import {Routes, Route} from 'react-router'
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import { useAuthenticate } from './Store/UseAuthenticate';
import Home from './Components/Home';
import Signup from './Components/Signup';

function App() {
  const [user, setUser] = useState({authenticated: false, userData: {}})

  return (
      <UserContext.Provider value={{user, setUser}}>
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='' element={<Home />}/>
          <Route path='login' element={<Login />}/>
          <Route path='signup' element={<Signup />}/>
        </Routes>
    </div>
      </UserContext.Provider>
  );
}

export default App;