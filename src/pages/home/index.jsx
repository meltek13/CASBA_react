import React from 'react';
import './home.css';
import { Link } from "react-router-dom";
const Home = () => {

  let dateFormatMonth = new Intl.DateTimeFormat("fr-FR",{month:"short"});
  let dateFormatDay = new Intl.DateTimeFormat("fr-FR",{day:"numeric"});

  let newDate =  new Date()
  return(
    <>
      <div id="container-home">
        <div id="jumbo-bg-home">
          <h1 id="title-jumbo">Bonjour<span id="Username"> Username,</span> </h1>
        </div>
        <hr />
        <div id="content-coloc">
          <h2>Voici les news de la coloc : </h2>
          <div id="box-tool">
            {/*----Calendar--------*/}
            <div className="tool">
              <p className="title-tool">Calendrier 🗓️ </p>
              <div className="card-body ">
                  <div className="card-header header-one">{dateFormatMonth.format(newDate)}</div>
                  <div className="card-content">{dateFormatDay.format(newDate)}</div>
              </div>
            </div>
            {/*----Events--------*/}
            <div className="tool">
              <p className="title-tool">Évennements 🎟️</p>
              <div className="card-body body-two">
                  <div className="event-card">Event</div>
                  <div className="event-card">Event</div>
                  <div className="event-card">Event</div>
                  <div className="event-card">Event</div>
              </div>
            </div>
            {/*------Expenses--------*/}
            <div className="tool">
              <p className="title-tool">Dépenses 💶</p>
              <div className="card-body body-three ">
                  <div className="card-header header-three">Tu dois :</div>
                  <div className="card-content"> 30€ <br />
                    <span className="content-text">à MelFlix pour 🍩</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div id="container-pics-coms">
          <h2> Photos:</h2>
        </div>
      </div>
    </>
  )
}

export default Home;