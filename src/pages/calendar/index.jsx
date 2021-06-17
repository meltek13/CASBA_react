import React, {useEffect, useState} from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Timetable = () => {
  
  const { id } = useParams()

  const [value, onChange] = useState(new Date());
  const [popUp, setPopUp] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [event, setEvent] = useState([]);
  const [userCreate, setUserCreate] = useState([])

  const changePopUp = () => {
    setPopUp(true)
  }

  const createEvent = () => {
    fetch("http://localhost:3000//dashboard/" + id + "/calendars", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"title": title, "description": description, "timedate": value.toString(), "dashboard": id, "by": parseInt(Cookies.get("current_user_id"))})
    })
  }




  useEffect(() => {
    fetch("http://localhost:3000//dashboard/" + id + "/calendars")
      .then((response) => response.json())
      .then((response) => setEvent(response))
  }, [])

  useEffect(() => {
    
    fetch("http://localhost:3000/members/" + event.map(e => e.by))
    .then((response) => response.json())  
    .then((response) => setUserCreate(oldArray => [...oldArray, response]))
   ;
  }, [event])

  const destroyEvent = (id) => {
    fetch('http://localhost:3000/calendars/' + id,{
      method: 'DELETE'
    })
    window.location.reload(false);
  }

  console.log()
  return (
    <>
      <div className="content-calendar">
        <Calendar
          className="calendar"
          onChange={onChange}
          value={value}
          onClickDay={changePopUp}
        />
      </div>
        {popUp && 
        <>
        <div className="popUp">
          <div className="popUp-container">
            {event.map(elem => elem.timedate === value.toString() && event.length > 0 &&
              <div className="contain-text" key={elem.id}>
                {userCreate[0]?.users.map(user => 
                  user.id === elem.by && <p>de: {user.email}</p>
                )}
                <p className="text-pop">Titre:{elem.title}</p>
                <p className="text-pop">Description: {elem.description}</p>
                <button className="button-delete" onClick={() =>  destroyEvent(elem.id)}>Supprimer l'evenement</button>
              </div>
            )}  
          </div>
          <div className="popUpcreate">
            <form>
              <input className="form-calendar" onChange={event => setTitle(event.target.value)} placeholder="Titre"/>
              <input className="form-calendar" onChange={event => setDescription(event.target.value)} placeholder="Description"/>
              <button className="form-calendar button-create" onClick={createEvent}>Soummetre</button>
            </form>
          </div>
        </div>
          </>
          }
    </>
  )
}


export default Timetable