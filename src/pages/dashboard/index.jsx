import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./dashboard.css";
import Calendar from "../calendar";
import News from "pages/news";
import Picture from "pages/picture";
import Expense from "pages/expense";
import { Popover, Button,Input   } from "antd";
import MiniAvatar from "components/AvatarGuest";
import url from "data/url.json"
import { ArrowRightOutlined, CheckCircleOutlined  } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";



const Dashboard = () => {
  const { id } = useParams();
  const [news, setNews] = useState(true);
  const [picture, setPicture] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [expense, setExpense] = useState(false);
  const [room, setRoom] = useState([]);

  const [guest, setGuest] = useState('')
  const history = useHistory();


  let dateFormatMonth = new Intl.DateTimeFormat("fr-FR", { month: "short" });
  let dateFormatDay = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
  });
  let newDate = new Date();

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
    fetch(url.url + "flatsharings/" + id + "/dashboard")
      .then((response) => response.json())
      .then((response) => {
        Cookies.set("admin_email", response.admin.email);
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
          <span>Actus</span>
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
      <hr/>

  
            <div className="Mini_avatar_display rightSide">
              <div className="StatusSolde">
                <h3>Status</h3>
                <h3>Solde</h3>
                
                </div>
                <hr className="trait"/>
                
                
                { room?.admin? 
                    (< MiniAvatar user={room.admin} key={room.admin.id}/>)
                        : 
                    (<Popover placement="leftBottom" content={"non inscrit"}>
                        <label for="file">
                            <img
                            style={{border:"4px solid rgb(245, 245, 38"}}
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
                        <Popover placement="leftBottom" content={"non inscrit"}>
                            <label for="file">
                                <img
                                   style={{border:"4px solid rgb(245, 245, 38"}}
                                className="avatar_dashboard"
                                src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                                alt="avatar"
                                />
                            </label>
                        </Popover> 
                        </div>
                )} 
                
             
              {parseInt(Cookies.get("current_user_id")) === room?.admin?.id && 
              
              <div className="add-guest">
                <div className="add-Room-mate">
                <Link  to={'/add-room-mate/' + id }>
                  <Popover placement="leftBottom" content="Ajouter un collocataire">
                    <label htmlFor="file">
                      <img className="avatar_dashboard"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png" alt="avatar" />
                    </label>
                  </Popover>
                </Link>
                <Link  to={'/add-room-mate/' + id }>Ajouter un colloc</Link>
                </div>
              </div>
            }

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
