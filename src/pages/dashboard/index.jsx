import React, { useState } from "react"
import { Link } from "react-router-dom";
import './dashboard.css'
import Calendar from '../calendar'
import News from "pages/news";
import Picture from "pages/picture"
import Expense from "pages/expense";

const Dashboard =()=>{

    const [news, setNews] = useState(true)
    const [picture, setPicture] = useState(false)
    const [calendar, setCalendar] = useState(false)
    const [expense, setExpense ] = useState(false)

    const changeNews = () => {
        setNews(true)
        setPicture(false)
        setCalendar(false)
        setExpense(false)
    }

    const changePicture = () => {
        setNews(false)
        setPicture(true)
        setCalendar(false)
        setExpense(false)
    }

    const changeCalendar = () => {
        setNews(false)
        setPicture(false)
        setCalendar(true)
        setExpense(false)
    }

    const changeExpenses = () => {
        setNews(false)
        setPicture(false)
        setCalendar(false)
        setExpense(true)
    }
    
    return (
        <>
            <div className="nav-dashboard">
                <button onClick={changeNews} className="btn-dashboard-nav">Actus coloc</button>
                <button onClick={changePicture} className="btn-dashboard-nav">Photos</button>
                <button onClick={changeCalendar} className="btn-dashboard-nav">Calendrier</button>
                <button onClick={changeExpenses} className="btn-dashboard-nav">Portefeuille</button>
            </div>
            <div className="content-dashboard">
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