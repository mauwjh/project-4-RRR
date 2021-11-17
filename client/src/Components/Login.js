import { Container } from "react-bootstrap";
import {useContext} from 'react'
import axios from 'axios'
import { UserContext } from "../UserContext";

const Login = () => {
  const userContext = useContext(UserContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log(formData.get('email'))

    axios.post('/api/users/login', {
      email: formData.get('email'), 
      password: formData.get('password')
    }).then((res) => {
      console.log(res.data)
      if(res.data){
        userContext.setUser({authenticated: true, userData: {res}})
      }
    })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name='email'
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            name='password'
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block" >
          Submit
        </button>
      </form>
    </Container>
  );
};

export default Login;
