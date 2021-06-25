import React, { useState, useEffect } from 'react';
import {
  useParams,
  BrowserRouter as Router,
  Link,
  useLocation,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import './dashboard.css';
import News from 'pages/news';
import Picture from 'pages/picture';
import Expense from 'pages/expense';
import { Popover } from 'antd';
import MiniAvatar from 'components/AvatarGuest';
import url from 'data/url.json';

import PageExpense from 'pages/display_expense';
import Error403 from 'pages/error403';
import Calendar from '../calendar';

const useQuery = () => new URLSearchParams(useLocation().search);

const Dashboard = () => {
  const query = useQuery();
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [yourDashboard, setYourDashboard] = useState(false);

  const verifyPresenceOfData = (data) => {
    if (JSON.stringify(data) === 'null') {
      return false;
    }
    return true;
  };

  const findUserRoom = () => {
    fetch(`${url.url}flatsharings/${id}/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        Cookies.set('admin_email', response.admin.email);
        setRoom(response);
      });
  };

  const ItisYourDashboard = () => {
    fetch(`${url.url}flatsharings/${id}/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        if (Cookies.get('current_user_id')) {
          if (parseInt(Cookies.get('current_user_id')) === response.admin.id) {
            setYourDashboard(true);
          } else {
            response.guest.forEach((flatmate) => {
              if (flatmate !== null) {
                if (flatmate.id === parseInt(Cookies.get('current_user_id'))) {
                  setYourDashboard(true);
                }
              }
            });
          }
        }
      });
  };

  useEffect(() => {
    ItisYourDashboard();
    findUserRoom();
  }, []);

  return (
    <div>
      {yourDashboard ? (
        <div>
          <div className="nav-dashboard">
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=actu`}>
              <strong>📰</strong>
              <span>Actus</span>
            </Link>
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=picture`}>
              <strong>📷</strong>
              <span>Photos</span>
            </Link>
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=calendar`}>
              <strong>🗓️</strong>
              <span>Calendar</span>
            </Link>
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=expense`}>
              {' '}
              <strong>💰</strong>
              <span>Dépenses</span>
            </Link>

            {parseInt(Cookies.get('current_user_id')) === room?.admin?.id && (
              <button className="btn-dashboard-nav ">
                <Link to={`/add-room-mate/${id}`}>
                  <Popover
                    placement="bottom"
                    content="Ajouter un collocataire"
                  >
                    <img
                      className=" add-roomate"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png"
                      alt="avatar"
                    />
                  </Popover>
                </Link>
              </button>
            )}
          </div>
          <hr />

          <div className="Mini_avatar_display rightSide">
            <div className="scroll-colloc">
              <div className="StatusSolde">
                <div>Colloc</div>
                <div className="alignStatus"> Status</div>
                <div>Solde</div>
              </div>
              <hr />
              {room.admin && (
                <MiniAvatar user={room.admin} key={room.admin.id} />
              )}

              {room?.guest?.map((user) => (verifyPresenceOfData(user) ? (
                <div>
                  <MiniAvatar user={user} key={user.id} />
                </div>
              ) : (
                <div className="unsubscribe">
                  <Popover placement="leftBottom" content="non inscrit">
                    <label htmlFor="file">
                      <img
                        style={{ border: '3px solid #FFFFB9' }}
                        className="avatar_dashboard"
                        src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                        alt="avatar"
                      />
                    </label>
                  </Popover>
                </div>
              )))}
            </div>

            <PageExpense />
          </div>

          <div className="content-dashboard">
            <Child name={query.get('name')} />
          </div>
          <div />
        </div>
      ) : (
        <Error403 />
      )}
    </div>
  );
};

export default Dashboard;

const Child = ({ name }) => (
  <div>
    {name === 'actu' && <News key="actu" />}
    {name === 'picture' && <Picture key="picture" />}
    {name === 'calendar' && <Calendar key="calendar" />}
    {name === 'expense' && <Expense key="expense" />}
  </div>
);
