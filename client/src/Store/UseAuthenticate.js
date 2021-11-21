import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export const useAuthenticate = () => {
  const userContext = useContext(UserContext)
  const [data, setData] = useState()
  useEffect(() => {
    axios
      .get("/api/users/authenticate", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if(res.data.authenticated) {
          console.log(res.data)
          if(userContext.user.userId !== res.data.userId){
            console.log(res.data)
            userContext.setUser(res.data)
          }
        }
      });
  }, [userContext, data]);
};