import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Event from 'components/eventByDay';
import './new.css';
import url from 'data/url.json';

const News = () => {
  const dateFormatMonth = new Intl.DateTimeFormat('fr-FR', { month: 'short' });
  const dateFormatDay = new Intl.DateTimeFormat('fr-FR', { day: 'numeric' });
  const [event, setEvent] = useState([]);
  const { id } = useParams();

  const day = new Date().getDate();
  const month = new Date().toLocaleString('en-GB', { month: 'short' });
  const year = new Date().getFullYear();
  const fulldate = JSON.stringify([`${month} ${day} ${year}`]);
  const newDate = new Date();

  const FindEvent = () => {
    fetch(`${url.url}dashboard/${id}/calendars`)
      .then((response) => response.json())
      .then((response) => {
        response.forEach((event) => {
          if (JSON.stringify([`${event.timedate.split(' ')[1]} ${event.timedate.split(' ')[2]} ${event.timedate.split(' ')[3]}`]) === fulldate) {
            setEvent((oldArray) => [...oldArray, event]);
          }
        });
      });
  };

  useEffect(() => {
    FindEvent();
  }, []);

  return (
    <div>
      <h1>Les actus</h1>
      <h2>
        Qu'est ce qui se passe à la casba ?
      </h2>
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
          {event.length !== 0 ? event.map((x) => <Event event={x} key={x.id} />) : <p>Rien de prévus pour aujourd'hui ...</p>}
        </div>
      </div>
    </div>
  );
};

export default News;
