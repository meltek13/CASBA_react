import { React } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "store-redux/index";
import Home_svg from "assets/img/home.svg";
import { useHistory } from "react-router-dom";
import url from "data/url.json";
import {
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.user.loged);
  const history = useHistory();
  const flat_id = Cookies.get("flat_id");
  const url_dashboard = "/dashboard/" + flat_id;

  const handleClick = (e) => {
    e.preventDefault();

    fetch(url.url + "users/sign_out", {
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
        Cookies.remove("flat_id");
        dispatch(logOut());
        history.push("/sign_in");
      });
  };

  return (
    <div className="navbar">
      <div className="content-link first">
        <Link className=" home-link" to="/">
          <img id="home-logo" src={Home_svg} alt="home logo" />
        </Link>
      </div>
      {flat_id ? (
        <div className="content-link">
          <Link className="link responsive-nav" to={url_dashboard}>
            Dashboard
          </Link>
          <Link className="nav-icon" title="Dashboard" to={url_dashboard}>
            <DashboardOutlined />
          </Link>
        </div>
      ) : (
        <div className="content-link">
          <Link className="link responsive-nav" to="/">
            Home
          </Link>
          <Link className="nav-icon" title="Accueil" to="/">
            <HomeOutlined />
          </Link>
        </div>
      )}

      {loged ? (
        <>
          <div className="content-link">
            <Link className="link responsive-nav" to="/profil">
              Mon profil
            </Link>
            <Link className="nav-icon" title="Profil" to="/profil">
              <UserOutlined />
            </Link>
          </div>
          <div className="content-link">
            <Link to="/" className="link responsive-nav" onClick={handleClick}>
              Deconnecter
            </Link>
            <Link
              to="/"
              className="nav-icon"
              title="Se deconnecter"
              onClick={handleClick}
            >
              <LogoutOutlined />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="content-link">
            <Link className="link responsive-nav" to="/sign_in">
              Se connecter
            </Link>
            <Link className="nav-icon" title="Se connecter" to="/sign_in">
              <LoginOutlined />
            </Link>
          </div>
          <div className="content-link">
            <Link className="link responsive-nav" to="/sign_up">
              S'inscrire
            </Link>
            <Link className="nav-icon" title="S'inscrire" to="/sign_up">
              <UserAddOutlined />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
