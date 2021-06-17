import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./dashboard.css";
import Calendar from "../calendar";
import News from "pages/news";
import Picture from "pages/picture";
import Expense from "pages/expense";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { id } = useParams();
  const [news, setNews] = useState(true);
  const [picture, setPicture] = useState(false);
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

  useEffect(() => {
    findUserRoom();
  }, []);

  const findUserRoom = () => {
    fetch("http://localhost:3000/flatsharings/" + id + "/dashboard")
      .then((response) => response.json())
      .then((response) => setRoom(response));
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
        <h3>Toute les personnes de la colocs:</h3>
        <p>{room?.admin?.email}</p>
        {room?.guest?.map((user) => (
          <p key={user?.id}>{user?.email}</p>
        ))}
        {news && <News />}
        {picture && <Picture />}
        {calendar && <Calendar />}
        {expense && <Expense />}
      </div>
    </>
  );
};

export default Dashboard;
