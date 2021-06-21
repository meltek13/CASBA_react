import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Event from "components/eventByDay"
import "./new.css"
import url from "data/url.json"

const News = () => {
  let dateFormatMonth = new Intl.DateTimeFormat("fr-FR", { month: "short" });
  let dateFormatDay = new Intl.DateTimeFormat("fr-FR", { day: "numeric" });
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  
  let day = new Date().getDate(); 
  let month = new Date().toLocaleString('en-GB', { month: 'short' }); 
  let year = new Date().getFullYear();
  let fulldate = JSON.stringify([`${month} ${day} ${year}`])
  let newDate = new Date()

const FindEvent = () =>{
  fetch(url.url + "dashboard/" + id + "/calendars")
      .then((response) => response.json())
      .then((response) => {
      response.forEach(event => {if (JSON.stringify([event.timedate.split(" ")[1] + " " + event.timedate.split(" ")[2] + " " + event.timedate.split(" ")[3]]) === fulldate){
        setEvent((oldArray) => [...oldArray, event])
      }} )

      });
    }

    useEffect(() => {
      FindEvent();
    }, []);

console.log(event)

  return (
    <div>
      <h1>actu</h1>
      <div className="calendarDisplay">
        <div className="tool">
          <div className="card-body ">
            <div className="card-header header-one">
              {dateFormatMonth.format(newDate)}
            </div>
              <div className="card-content">{dateFormatDay.format(newDate)}</div>
          </div>
        </div>
        <div className="boxEventToday">
          {event.length !== 0? event.map(x=><Event event={x} key={x.id}/>) : <p>Rien pour aujourd'hui ...</p>}
        </div>
      </div>
    </div>
  );
};

export default News;
