import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './navbar.css';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'store-redux/index';
import { disconnect } from 'store-redux/room';
import HomeSvg from 'assets/img/home.svg';

import url from 'data/url.json';
import {
  LoginOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.user.loged);
  const roomConnect = useSelector((state) => state.room.connect);
  const history = useHistory();
  const flatId = Cookies.get('flat_id');
  const urlDashboard = `/dashboard/${flatId}?name=actu`;

  const handleClick = (e) => {
    e.preventDefault();

    fetch(`${url.url}users/sign_out`, {
      method: 'delete',
      headers: {
        Authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((userdata) => {
        console.log(userdata);
        Cookies.remove('token');
        Cookies.remove('flat_id');
        dispatch(logOut());
        dispatch(disconnect());
        history.push('/sign_in');
      });
  };

  return (
    <div className="navbar">
      <div className="content-link first">
        <Link className=" home-link" to="/">
          <img id="home-logo" src={HomeSvg} alt="home logo" />
        </Link>
      </div>
      {roomConnect || flatId ? (
        <div className="content-link">
          <Link className="link responsive-nav" to={urlDashboard}>
            Dashboard
          </Link>
          <Link className="nav-icon" title="Dashboard" to={urlDashboard}>
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
