import React, {useEffect, useState} from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'


const Timetable = () => {
  
  const [value, onChange] = useState(new Date());
  const [popUp, setPopUp] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [event, setEvent] = useState([]);

  const changePopUp = () => {
    setPopUp(true)
  }

  const createEvent = () => {
    fetch("http://localhost:3000/calendars", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"title": title, "description": description, "timedate": value.toString()})
    })
  }

  useEffect(() => {
    fetch('http://localhost:3000/calendars')
      .then((response) => response.json())
      .then((response) => setEvent(response))
  }, [])
  // console.log(event)
  event.map(elem => elem.timedate === value.toString() && console.log(elem.title))

  return (
    <>
      <div className="content-calendar">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={changePopUp}
        />
      </div>
        {popUp && 
        <>
          <div className="popUp-container">
            {event.map(elem => elem.timedate === value.toString() && 
              <div className="contain-text" key={elem.id}>
                <p className="text-pop">Titre:{elem.title}</p>
                <p className="text-pop">Description: {elem.description}</p>
              </div>
            )}  
          </div>
          
          <div className="popUpcreate">
            <form>
              <input className="form-calendar" onChange={event => setTitle(event.target.value)} placeholder="Titre"/>
              <input className="form-calendar" onChange={event => setDescription(event.target.value)} placeholder="Description"/>
              <button className="form-calendar" onClick={createEvent}>Soummetre</button>
            </form>
            {/* <h1 className="form-calendar">{value.toString()}</h1> */}
          </div>
          </>
          }
    </>
  )
}


export default Timetable