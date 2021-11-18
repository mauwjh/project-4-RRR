import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [usernameValidation, setUsernameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [pwValidation, setPwValidation] = useState("");
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username) {
      setUsernameValidation(false);
    } else if (!email) {
      setUsernameValidation(true);
      setEmailValidation(false);
    } else if (!password) {
      setEmailValidation(true);
      setPwValidation(false);
    } else {
      setPwValidation(true);
      axios
        .post("/api/users/new", {
          username: username,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setMessage(res.data.message);
            setTimeout(() => {
              navigate('/')
            }, 1500)
          } else {
            setMessage(res.data.message)
          }
        });
    }
  };

  return (
    <div class="container mt-5">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input
            name="username"
            type="username"
            class="form-control"
            id="inputUsername"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
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
        {emailValidation === "" ? null : !emailValidation ? (
          <div class="alert alert-danger" role="alert">
            Please key in a valid email
          </div>
        ) : null}
        {usernameValidation === "" ? null : !usernameValidation ? (
          <div class="alert alert-danger" role="alert">
            Please key in a valid username
          </div>
        ) : null}
        {pwValidation === "" ? null : !pwValidation ? (
          <div class="alert alert-danger" role="alert">
            Please key in your password
          </div>
        ) : null}
        {message ? (
          <div class="alert alert-danger" role="alert">
            {message}
          </div>
        ) : null}
        <button type="submit" class="btn btn-primary btn-block mt-5">
          Sign-Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
