import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="content-link">
        <Link className="link" to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
