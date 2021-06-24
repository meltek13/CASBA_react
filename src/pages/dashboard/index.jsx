import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./dashboard.css";
import Calendar from "../calendar";
import News from "pages/news";
import Picture from "pages/picture";
import Expense from "pages/expense";
import { Popover } from "antd";
import MiniAvatar from "components/AvatarGuest";
import url from "data/url.json";
import { Link } from "react-router-dom";
import PageExpense from "pages/display_expense";
import Error403 from "pages/error403";

const Dashboard = () => {
  const { id } = useParams();
  const [news, setNews] = useState(true);
  const [picture, setPicture] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [expense, setExpense] = useState(false);
  const [room, setRoom] = useState([]);
  const [span1, setSpan1] = useState('#3FA9FF')
  const [span2, setSpan2] = useState('black')
  const [span3, setSpan3] = useState('black')
  const [span4, setSpan4] = useState('black')
  const [yourDashboard, setYourDashboard] = useState(false);

  const changeNews = () => {
    setSpan1('#3FA9FF')
    setSpan2('black')
    setSpan3('black')
    setSpan4('black')
    setNews(true);
    setPicture(false);
    setCalendar(false);
    setExpense(false);
  };

  const changePicture = () => {
    setSpan1('black')
    setSpan2('#3FA9FF')
    setSpan3('black')
    setSpan4('black')
    setNews(false);
    setPicture(true);
    setCalendar(false);
    setExpense(false);
  };

  const changeCalendar = () => {
    setSpan1('black')
    setSpan2('black')
    setSpan3('#3FA9FF')
    setSpan4('black')
    setNews(false);
    setPicture(false);
    setCalendar(true);
    setExpense(false);
  };

  const changeExpenses = () => {
    setSpan1('black')
    setSpan2('black')
    setSpan3('black')
    setSpan4('#3FA9FF')
    setNews(false);
    setPicture(false);
    setCalendar(false);
    setExpense(true);
  };

  const verifyPresenceOfData = (data) => {
    if (JSON.stringify(data) === "null") {
      return false;
    } else {
      return true;
    }
  };

  const findUserRoom = () => {
    fetch(url.url + "flatsharings/" + id + "/dashboard")
      .then((response) => response.json())
      .then((response) => {
        Cookies.set("admin_email", response.admin.email);
        setRoom(response);
      });
  };

  const ItisYourDashboard = () => {
    fetch(url.url + "flatsharings/" + id + "/dashboard")
      .then((response) => response.json())
      .then((response) => {
        if (Cookies.get("current_user_id")) {
          if (parseInt(Cookies.get("current_user_id")) === response.admin.id) {
            console.log(response.admin.id);

            setYourDashboard(true);
          } else {
            response.guest.forEach((flatmate) => {
              if (flatmate !== null) {
                if (flatmate.id === parseInt(Cookies.get("current_user_id"))) {
                  console.log(flatmate);
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
            <button onClick={changeNews} className="btn-dashboard-nav">
              <strong>📰</strong>
              <span style={{color:span1}}>Actus</span>
            </button>
            <button onClick={changePicture} className="btn-dashboard-nav">
              <strong>📷</strong>
              <span style={{color:span2}}>Photos</span>
            </button>
            <button onClick={changeCalendar} className="btn-dashboard-nav">
              <strong>🗓️</strong>
              <span style={{color:span3}}>Calendrier</span>
            </button>
            <button onClick={changeExpenses} className="btn-dashboard-nav">
              <strong>💰</strong>
              <span style={{color:span4}}>Dépenses</span>
            </button>
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
                    <Popover placement="leftBottom" content={"non inscrit"}>
                      <label for="file">
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
            {parseInt(Cookies.get("current_user_id")) === room?.admin?.id && (
              <div>
                <div className="add-guest">
                  <div className="add-Room-mate">
                    <Link to={"/add-room-mate/" + id}>
                      <Popover
                        placement="leftBottom"
                        content="Ajouter un collocataire"
                      >
                        <label htmlFor="file">
                          <img
                            className="avatar_dashboard"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png"
                            alt="avatar"
                          />
                        </label>
                      </Popover>
                    </Link>
                    <Link to={"/add-room-mate/" + id}>Ajouter un colloc</Link>
                  </div>
                </div>
                <PageExpense />
              </div>
            )}
          </div>
          <div className="content-dashboard">
            {news && <News />}
            {picture && <Picture />}
            {calendar && <Calendar />}
            {expense && <Expense />}
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
