import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./dashboard.css";
import Calendar from "../calendar";
import News from "pages/news";
import Picture from "pages/picture";
import Expense from "pages/expense";
import Cookies from "js-cookie";
import { Tooltip} from 'antd';
import MiniAvatar from "components/AvatarGuest"

const Dashboard = () => {

    const { id } = useParams() 
    const [news, setNews] = useState(true)
    const [picture, setPicture] = useState(false)
    const [avatar, setAvatar] = useState("")
    const [avatarAdmin, setAvatarAdmin] = useState("")
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

    const verifyPresenceOfData= (data)=>{
        if (JSON.stringify(data) === "null" ){
            return false 
        }else {
            return true
        }      
    }


    useEffect(() => {
        findUserRoom();
    }, []);

    const findUserRoom = () => {
        fetch('http://localhost:3000/flatsharings/'+ id +'/dashboard')
        .then((response) => response.json())
        .then((response) => {
            findAvatarAdmin(response.admin.id)
            setRoom(response)
            })
    }    
     

    const findAvatarAdmin = (id) => {
        
        fetch("http://localhost:3000/members/" + id, {
            method: "get",
            headers: {
                Authorization: Cookies.get("token"),
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
            if (response.avatar) { setAvatarAdmin(decodeUrlForImage(response.avatar.url))} 
            else {setAvatarAdmin("https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png")}
          });
      };

     

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

            <div className="content-dashboard">    
             
                <Tooltip placement="bottom" title={room?.admin?.email}>
                    <label for="file">
                        <img
                        className="avatar_dashboard"
                        src={avatarAdmin}
                        alt="avatar"
                        />
                    </label>
                </Tooltip> 
                  
                {room?.guest?.map(user => 
                 verifyPresenceOfData(user)? 
                    < MiniAvatar user={user} key={user.id}/>
                    :
                    (<Tooltip placement="bottom" title={"non inscrit"}>
                     <label for="file">
                     <img
                     className="avatar_dashboard"
                     src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                     alt="avatar"
                     />
                 </label>
             </Tooltip> )
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
        <div/>
    </div>
    )
}

export default Dashboard

