import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./dashboard.css";
import Calendar from "../calendar";
import News from "pages/news";
import Picture from "pages/picture";
import Expense from "pages/expense";
import Cookies from "js-cookie";
import { Tooltip} from 'antd';

const Dashboard = () => {
    const { id } = useParams() 
    const [news, setNews] = useState(true)
    const [picture, setPicture] = useState(false)
    const [avatar, setAvatar] = useState("")
    const [calendar, setCalendar] = useState(false)
    const [expense, setExpense ] = useState(false)
    const [room, setRoom] = useState([])
 

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

    

    const decodeUrlForImage = (imageUrl) => {
        let link = imageUrl;
        let linkStart = link.substring(0, 16);
        let linkMiddle = ":3000/";
        let linkEnd = link.substring(17, link.length);
        let constructor = linkStart + linkMiddle + linkEnd;
    
        return constructor;
      };


  useEffect(() => {
    findUserRoom();
  }, []);

    const findUserRoom = () => {
        fetch('http://localhost:3000/flatsharings/'+ id +'/dashboard')
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            setRoom(response)
            })
    }    

    const findAvatar = (id) => {
        
        fetch("http://localhost:3000/members/" + id, {
          method: "get",
          headers: {
            Authorization: Cookies.get("token"),
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.avatar) {
                setAvatar(response.avatar)
              return true;
            } else {
                setAvatar("https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png")
              return false
            }
          });
      };
    return (
        <>
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
            <div className="content-dashboard">    
             
               <Tooltip placement="bottom" title={room?.admin?.email}>
                    <label for="file">
                    <img
                      className="avatar_dashboard"
                      
                      src={findAvatar(room?.admin?.id) ? (decodeUrlForImage(avatar)) : (avatar)}
                      alt="avatar"
                    />
                  </label>
                  </Tooltip> 
                {room?.guest?.map(user => 
                <Tooltip placement="bottom" title={user.email}>
                    <label for="file">
                        
                    <img
                      className="avatar_dashboard"
                      src={findAvatar(user.id) ? (decodeUrlForImage(avatar)) : (avatar)}
                      alt="avatar"
                    />
                  </label>
                  </Tooltip> 
                  
                 
                )} 
                {news &&
                    <News />
                }
                {picture &&
                    <Picture /> 
                }
                {calendar && 
                    <Calendar />
                }
                {expense &&
                    <Expense />
                }
            </div>
       </>
    )
}

export default Dashboard

