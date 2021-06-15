import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "store-redux/index";

const Navbar = () => {
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.loged);

  const handleClick = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/users/sign_out", {
      method: "delete",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((userdata) => {
        console.log(userdata);
        Cookies.remove("token");
        dispatch(logOut());
      });
  };

  return (
    <div className="navbar">
      <div className="content-link">
        <Link className="link" to="/">
          Home
        </Link>
      </div>

      {loged ? (
        <>
          <div className="content-link">
            <Link className="link" to="/profil">
              Mon profil
            </Link>
          </div>
          <div className="content-link">
            <button href="" className="link btn-nav" onClick={handleClick}>
              Deconnecter
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="content-link">
            <Link className="link" to="/sign_in">
              Se connecter
            </Link>
          </div>
          <div className="content-link">
            <Link className="link" to="/sign_up">
              S'inscrire
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
