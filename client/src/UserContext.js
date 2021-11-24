import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'

const UseAuth = createContext()

export const UserContext = () => {
  return useContext(UseAuth)
}

export const AuthService = ({children}) => {
  const [user, setUser] = useState({ authenticated: false, userData: {} })

  const useAuthenticate = () => {
    useEffect(() => {
      axios
        .get("/api/users/authenticate", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
              setUser(res.data)
        });
    }, []);
  }

  const values = {user, useAuthenticate, setUser}

  return (
    <UseAuth.Provider value={values}>
      {children}
    </UseAuth.Provider>
  )
}