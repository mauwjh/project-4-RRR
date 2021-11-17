import {UserContext} from './UserContext'
import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router'
import Navbar from './Components/Navbar';
import Login from './Components/Login';

function App() {
  const [user, setUser] = useState({authenticated: false, userData: {}})

  useEffect(() => {

  }, [])
  
  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
      <Navbar/>
        <Routes>
          <Route path='login' element={<Login />}/>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
