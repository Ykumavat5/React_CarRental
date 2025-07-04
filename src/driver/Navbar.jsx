import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useState } from "react";
import { useDriverAuth } from "../Context/DriverAuthContext";

function Navbar() {
  const { user, logout } = useDriverAuth();
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/driver/dashboard">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/myearnings">
                My earnings
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/support">
                Support
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/myProfile">
                My profile
              </Link>
            </li>

            <li>
              <Link onClick={logout} to="/driver/login">
                Logout
              </Link>
            </li>
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/driver/dashboard" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/driver/dashboard">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/myearnings">
                My earnings
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/support">
                Support
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/myProfile">
                My profile
              </Link>
            </li>

            {user && (
              <Link className="navbar__buttons__sign-in" onClick={logout} to='/driver/login'>
                Logout
              </Link>
            )}
          </ul>
          {!user && (

          <div className="navbar__buttons">
            <Link className="navbar__buttons__sign-in" to="/driver/login">
              Sign In
            </Link>
            <Link className="navbar__buttons__register" to="/driver/register">
              Register
            </Link>
          </div>

         )}


          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}
// {!user && (
              
//   <div className="navbar__buttons">
//     <Link className="navbar__buttons__sign-in" to="/login">
//       Sign In
//     </Link>
//     <Link className="navbar__buttons__register" to="/register">
//       Register
//     </Link>
//   </div>

// )}
// {user && (
// <Link className="navbar__buttons__sign-in" onClick={logout} to='/logout'>
//   Logout
// </Link>
// // <button
// //   className="navbar__buttons__logout btn" style={{ border: "none" }}
// //   onClick={logout}
// //   type="button"
// // >
// //   Logout
// // </button>
// )}
export default Navbar;
