import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {UserContext} from '../UserContext'

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailValidation, setEmailValidation] = useState("");
  const [pwValidation, setPwValidation] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const {setUser} = UserContext()

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setEmailValidation(false);
    } else if (!password) {
      setEmailValidation(true);
      setPwValidation(false);
    } else {
      setPwValidation(true);
      axios
        .post("/api/users/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.authenticated) {
            localStorage.setItem("token", res.data.token);
            setUser(res.data)
            console.log(res.data)
            window.history.back()
          } else {
            setErrorMessage(res.data.message);
          }
        });
    }
  };

  return (
    <div class="container mt-5">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </div>
        {emailValidation === '' ? null : !emailValidation ? (
          <div class="alert alert-danger" role="alert">
            Please key in a valid email
          </div>
        ) : null}
        {pwValidation === '' ? null : !pwValidation ? (
          <div class="alert alert-danger" role="alert">
            Please key in your password
          </div>
        ) : null}
        {errorMessage ? (
          <div class="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        ) : null}
        <button type="submit" class="btn btn-primary btn-block mt-5">
          Submit
        </button>
        <div>
          <p>
            Don't have an account? <Link to="/signup">Sign-Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
