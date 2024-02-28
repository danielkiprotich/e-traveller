import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ title }) => {
  return (
    <nav className="navbar px-2 mb-4">
      <h1 className="text-white">{title}</h1>
      <Link className="nav-link fs-3" to="/">
        Buses
      </Link>
      <Link className="nav-link fs-3" to="/users">
        Users
      </Link>
      <Link className="nav-link fs-3" to="/trips">
        Trips
      </Link>
    </nav>
  );
};

export default NavBar;
