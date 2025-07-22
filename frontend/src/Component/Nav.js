import React from "react";
import "./nav.css"; // Link the CSS file
//import Login from "./login"
import { Link } from "react-router-dom";
//import {Link} from "react-router-dom";
//        <li><Link href="#about">Login</Link></li>
function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar">
      <h1 className="logoName">My DSA Search App</h1>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        {!isLoggedIn ? (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </>
        ) : (
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;