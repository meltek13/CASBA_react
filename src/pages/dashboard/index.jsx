import React, { useState, useEffect } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Link,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./dashboard.css";
import News from "pages/news";
import Picture from "pages/picture";
import Expense from "pages/expense";
import { Popover } from "antd";
import MiniAvatar from "components/AvatarGuest";
import url from "data/url.json";
import PageExpense from "pages/display_expense";
import Error403 from "pages/error403";
import Calendar from "../calendar";

const useQuery = () => new URLSearchParams(useLocation().search);

const Dashboard = () => {
  const query = useQuery();
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [yourDashboard, setYourDashboard] = useState(false);

  const [span1, setSpan1] = useState("#3FA9FF");
  const [span2, setSpan2] = useState("black");
  const [span3, setSpan3] = useState("black");
  const [span4, setSpan4] = useState("black");

  const changeColor1 = () => {
    setSpan1("#3FA9FF");
    setSpan2("black");
    setSpan3("black");
    setSpan4("black");
  };
  const changeColor2 = () => {
    setSpan1("black");
    setSpan2("#3FA9FF");
    setSpan3("black");
    setSpan4("black");
  };
  const changeColor3 = () => {
    setSpan1("black");
    setSpan2("black");
    setSpan3("#3FA9FF");
    setSpan4("black");
  };
  const changeColor4 = () => {
    setSpan1("black");
    setSpan2("black");
    setSpan3("black");
    setSpan4("#3FA9FF");
  };

  const verifyPresenceOfData = (data) => {
    if (JSON.stringify(data) === "null") {
      return false;
    }
    return true;
  };

  const findUserRoom = () => {
    fetch(`${url.url}flatsharings/${id}/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        setRoom(response);
      });
  };

  const ItisYourDashboard = () => {
    fetch(`${url.url}flatsharings/${id}/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        if (response?.status === 404) {
          setYourDashboard(false);
        } else {
          if (Cookies.get("current_user_id")) {
            if (
              parseInt(Cookies.get("current_user_id")) === response.admin.id
            ) {
              setYourDashboard(true);
            } else {
              response.guest.forEach((flatmate) => {
                if (flatmate !== null) {
                  if (
                    flatmate.id === parseInt(Cookies.get("current_user_id"))
                  ) {
                    setYourDashboard(true);
                  }
                }
              });
            }
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
            <Link
              className="btn-dashboard-nav"
              to={`/dashboard/${id}?name=actu`}
              onClick={changeColor1}
            >
              <strong className="icon-nav-dash">📰</strong>
              <span style={{ color: span1 }}> Actus</span>
            </Link>
            <Link
              className="btn-dashboard-nav"
              to={`/dashboard/${id}?name=picture`}
              onClick={changeColor2}
            >
              <strong className="icon-nav-dash">📷</strong>

              <span style={{ color: span2 }}>Photos</span>
            </Link>
            <Link
              className="btn-dashboard-nav"
              to={`/dashboard/${id}?name=calendar`}
              onClick={changeColor3}
            >
              <strong className="icon-nav-dash">🗓️</strong>

              <span style={{ color: span3 }}>Calendar</span>
            </Link>
            <Link
              className="btn-dashboard-nav"
              to={`/dashboard/${id}?name=expense`}
              onClick={changeColor4}
            >
              <strong className="icon-nav-dash">💰</strong>

              <span style={{ color: span4 }}>Dépenses</span>
            </Link>

            {parseInt(Cookies.get("current_user_id")) === room?.admin?.id && (
              <button className="btn-dashboard-nav ">
                <Link to={`/add-room-mate/${id}`}>
                  <Popover placement="bottom" content="Inviter une/un coloc">
                    <img
                      className=" add-roomate"
                      src="https://img.icons8.com/ios-filled/50/000000/add-user-group-man-man--v2.png"
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

              {room?.guest?.map((user) =>
                verifyPresenceOfData(user) ? (
                  <div>
                    <MiniAvatar user={user} key={user.id} />
                  </div>
                ) : (
                  <div className="unsubscribe">
                    <Popover
                      placement="leftBottom"
                      content="Pas encore inscrit"
                    >
                      <label htmlFor="file">
                        <img
                          style={{ border: "3px solid #FFFFB9" }}
                          className="avatar_dashboard"
                          src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                          alt="avatar"
                        />
                      </label>
                    </Popover>
                  </div>
                )
              )}
            </div>

            <PageExpense />
          </div>

          <div className="content-dashboard">
            <Child name={query.get("name")} />
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
    {name === "actu" && <News key="actu" />}
    {name === "picture" && <Picture key="picture" />}
    {name === "calendar" && <Calendar key="calendar" />}
    {name === "expense" && <Expense key="expense" />}
  </div>
);
