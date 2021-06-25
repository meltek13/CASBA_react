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
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import PageExpense from "pages/display_expense";
import Error403 from "pages/error403";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {

  let query = useQuery();
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [yourDashboard, setYourDashboard] = useState(false);
  const [span1,setSpan1] = useState("#3FA9FF")
  const [span2,setSpan2] = useState("black")
  const [span3,setSpan3] = useState("black")
  const [span4,setSpan4] = useState("black")
  const changeColor1 =()=>{
    setSpan1("#3FA9FF")
    setSpan2("black")
    setSpan3("black")
    setSpan4("black")
  }
  const changeColor2 =()=>{
    setSpan1("black")
    setSpan2("#3FA9FF")
    setSpan3("black")
    setSpan4("black")
}
  const changeColor3 =()=>{
    setSpan1("black")
    setSpan2("black")
    setSpan3("#3FA9FF")
    setSpan4("black")
  }
  const changeColor4 =()=>{
    setSpan1("black")
    setSpan2("black")
    setSpan3("black")
    setSpan4("#3FA9FF")
  }

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
            setYourDashboard(true);
          } else {
            response.guest.forEach((flatmate) => {
              if (flatmate !== null) {
                if (flatmate.id === parseInt(Cookies.get("current_user_id"))) {
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
          <div className="nav-dashboard" >
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=actu`} onClick={changeColor1}>
              <strong>📰</strong>
              <span style={{color: span1}}>Actus</span>
            </Link>
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=picture`} onClick={changeColor2}>
              <strong>📷</strong>
              <span  style={{color: span2}}>Photos</span>
            </Link>
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=calendar`} onClick={changeColor3}>
              <strong>🗓️</strong>
              <span  style={{color: span3}}>Calendar</span>
            </Link>
            <Link className="btn-dashboard-nav" to={`/dashboard/${id}?name=expense`} onClick={changeColor4}> 
              <strong>💰</strong>
              <span  style={{color: span4}}>Dépenses</span>
            </Link>

            {parseInt(Cookies.get("current_user_id")) === room?.admin?.id && (
              <button className="btn-dashboard-nav ">
                <Link to={"/add-room-mate/" + id}>
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

const Child = ({ name }) => {
 
  return (
    <div>
      {name === "actu" && <News key="actu"/>}
      {name === "picture" && <Picture key="picture"/>}
      {name === "calendar" && <Calendar key="calendar"/>}
      {name === "expense" && <Expense key="expense"/>}
    </div>
  );
}