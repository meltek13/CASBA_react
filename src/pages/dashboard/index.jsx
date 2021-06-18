import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./dashboard.css";
import Calendar from "../calendar";
import News from "pages/news";
import Picture from "pages/picture";
import Expense from "pages/expense";
import Cookies from "js-cookie";
import { Popover } from "antd";
import MiniAvatar from "components/AvatarGuest";

const Dashboard = () => {
  const { id } = useParams();
  const [news, setNews] = useState(true);
  const [picture, setPicture] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarAdmin, setAvatarAdmin] = useState("");
  const [calendar, setCalendar] = useState(false);
  const [expense, setExpense] = useState(false);
  const [room, setRoom] = useState([]);

  const changeNews = () => {
    setNews(true);
    setPicture(false);
    setCalendar(false);
    setExpense(false);
  };

  const changePicture = () => {
    setNews(false);
    setPicture(true);
    setCalendar(false);
    setExpense(false);
  };

  const changeCalendar = () => {
    setNews(false);
    setPicture(false);
    setCalendar(true);
    setExpense(false);
  };

  const changeExpenses = () => {
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
    fetch("http://localhost:3000/flatsharings/" + id + "/dashboard")
      .then((response) => response.json())
      .then((response) => {
        setRoom(response);
      });
  };

  useEffect(() => {
    findUserRoom();
  }, []);

  return (
    <div>
      <div className="nav-dashboard">
        <button onClick={changeNews} className="btn-dashboard-nav">
          <span>Actus coloc</span>
          <strong>📰</strong>
        </button>
        <button onClick={changePicture} className="btn-dashboard-nav">
          <strong>📷</strong>
          <span>Photos</span>
        </button>
        <button onClick={changeCalendar} className="btn-dashboard-nav">
          <strong>🗓️</strong>
          <span>Calendrier</span>
        </button>
        <button onClick={changeExpenses} className="btn-dashboard-nav">
          <strong>💰</strong>
          <span>Dépenses</span>
        </button>
      </div>

     
            <div className="Mini_avatar_display">
                
                { room?.admin? 
                    (< MiniAvatar user={room.admin} key={room.admin.id}/>)
                        : 
                    (<Popover content={"non inscrit"}>
                        <label for="file">
                            <img
                            className="avatar_dashboard"
                            src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                            alt="avatar"
                            />
                        </label>
                    </Popover> )
                }
               
                 
                {room?.guest?.map(user => 
                    verifyPresenceOfData(user)? 
                        <div>
                        < MiniAvatar user={user} key={user.id}/>
                        </div>
                            :
                            <div>
                        <Popover content={"non inscrit"}>
                            <label for="file">
                                <img
                                className="avatar_dashboard"
                                src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                                alt="avatar"
                                />
                            </label>
                        </Popover> 
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
  );
};

export default Dashboard;
