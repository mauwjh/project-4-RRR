import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import logo from '../Images/android-chrome-512x512.png'

const Navbar = () => {
  const { user } = UserContext();

  const logoutUser = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link to="/">
          <div class="navbar-brand"><img src={logo} alt='logo' style={{maxHeight: '50px'}}/></div></Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarScroll">
          <ul class="navbar-nav me-auto my-2 my-lg-0">
            <li class="nav-item">
              <Link to="/">
                <div class="nav-link">Home</div>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/listings/new">
                <div class="nav-link">Trade an Item</div>
              </Link>
            </li>
            <li class="nav-item">
              {user?.authenticated ? (
                <Link to={`/account/${user.userId}`}><div class="nav-link">
                  Account
                </div></Link>
              ) : null}
            </li>
            <li class="nav-item ">
              {user?.authenticated ? (
                <Link to={`/`}><div class="nav-link" onClick={logoutUser}>
                  Logout
                </div></Link
              ) : <Link to={`/login`}><div class="nav-link">
              Sign-in
            </div></Link>}
            </li>
          </ul>
          {/* <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
