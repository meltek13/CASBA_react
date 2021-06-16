import React, { useState, useEffect } from "react"
import {useParams } from "react-router-dom";
import './dashboard.css'
import Calendar from '../calendar'
import News from "pages/news";
import Picture from "pages/picture"
import Expense from "pages/expense";
import Cookies from "js-cookie";

const Dashboard =()=>{

    const { id } = useParams() 

    const [news, setNews] = useState(true)
    const [picture, setPicture] = useState(false)
    const [calendar, setCalendar] = useState(false)
    const [expense, setExpense ] = useState(false)
    const [data, setData] = useState('')
    const [room, setRoom] = useState([])

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
    

    useEffect(() => {
        findRoom()
    },[])

    useEffect(() => {
        findUserRoom()
    },[data])

    const findRoom = () => {
        fetch('http://localhost:3000/flatsharings/' + id)
        .then((response) => response.json())
        .then((response) => setData(response))
    }

    const findUserRoom = () => {
        fetch('http://localhost:3000/members')
            .then((response) => response.json())
            .then((response) =>  {
                setRoom(response.users.filter((user) => {
                    if(user.id === data.admin_id){
                            return true
                    }
                    if(data.pending_invitation?.length){
                        if(data.pending_invitation.find(guest => guest === user.email) ){
                            return true
                        }
                    } return false
                }))
            })
    }    




    return (
        <>
            <h1 className="title-dashboard">{data.title}</h1>
            <div className="nav-dashboard">
                <button onClick={changeNews} className="btn-dashboard-nav">Actus coloc 📰</button>
                <button onClick={changePicture} className="btn-dashboard-nav">Photos 📷</button>
                <button onClick={changeCalendar} className="btn-dashboard-nav">Calendrier 🗓️</button>
                <button onClick={changeExpenses} className="btn-dashboard-nav">Dépenses 💶</button>

            </div>
            <div className="content-dashboard">    
            <h3>Toute les personnes de la colocs: {room.map((user) => <p key={user.id}>{user.email}</p>)}</h3>    
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