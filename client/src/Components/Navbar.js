import {Link} from 'react-router-dom'
import { UserContext } from '../UserContext';

const Navbar = () => {
  const {user} = UserContext()

  const logoutUser = () => {
    localStorage.removeItem("token")
    window.location.replace('/')
  }

  return(   
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/'><div class="navbar-brand">
        Logo Stuff
      </div></Link>
      <Link to='/listings/new'><button class="btn btn-outline-success ml-2">
        Trade an Item
      </button></Link>
      <form class="form-inline my-2 my-lg-0 ml-auto">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      {user?.authenticated ? <button class="btn btn-outline-success ml-2" onClick={logoutUser}>
        Logout
      </button> : null}
    </div>
  </nav>
  )
};

export default Navbar