import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import url from "data/url.json"
import { Form, Input, Button, Select } from 'antd';
import { Notif_sucess_event } from "components/Notifications";


const Timetable = () => {
  const { id } = useParams();

  const [value, onChange] = useState(new Date());
  const [popUp, setPopUp] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event, setEvent] = useState([]);
  const [userCreate, setUserCreate] = useState([]);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
  const changePopUp = () => {
    setPopUp(true);
  };

  const createEvent = () => {
    fetch(url.url + "dashboard/" + id + "/calendars", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        timedate: value.toString(),
        dashboard: id,
        by: parseInt(Cookies.get("current_user_id")),
      }),
    })
      .then((response) =>  {
        Notif_sucess_event()
      });
    
  };
 
  useEffect(() => {
    fetch(url.url + "dashboard/" + id + "/calendars")
      .then((response) => response.json())
      .then((response) => setEvent(response));
  }, []);

  useEffect(() => {
    fetch(url.url +"/members/" + event.map((e) => e.by))
      .then((response) => response.json())
      .then((response) => setUserCreate((oldArray) => [...oldArray, response]));
  }, [event]);

  const destroyEvent = (id) => {
    fetch(url.url + "calendars/" + id, {
      method: "DELETE",
    });
    window.location.reload(false);
  };
  

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
    <div className="form-global-calendar">
      <div className="content-calendar">
        <Calendar
          className="calendar"
          onChange={onChange}
          value={value}
          onClickDay={changePopUp}
        />
      </div>

      <div className="formCalendar2">
      <Form {...layout}  name="control-ref" >
        <h2>
          Un nouvel évenement à venir ?
        </h2>
        <p>
          <span className="colorBlue">{value.toISOString().slice(0, 10)}</span> (choisis une date le calendrier)
        </p>
        <span>Intitulé</span>
        <Form.Item
          name="title"
          label=""
          onChange={(event) => setTitle(event.target.value)}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <span>Description</span>
        <Form.Item
          name="description"
          label=""
          onChange={(event) => setDescription(event.target.value)}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button onClick={createEvent} type="primary" htmlType="submit">
            Enregistrer
          </Button>
        </Form.Item>
      </Form>
      </div>
      </div>
      {popUp && (
        <>
          <div className="popUp">
          <h2>Evenement du <strong>{value.toISOString().slice(0, 10)}</strong></h2>
            <div className="popUp-container">
              {event.map(
                (elem) =>
                  elem.timedate === value.toString() &&
                  event.length > 0 && (
                    <div className="contain-text" key={elem.id}>
                      {userCreate[0]?.users.map(
                        (user) => user.id === elem.by && <p> {user.email}</p>
                      )}
                      <p className="text-pop"><span className="colorBlue">Intitulé</span> : {elem.title}</p>
                      <p className="text-pop">
                      <span className="colorBlue">Description </span> : {elem.description}
                      </p>
                      <button
                        className="button-delete"
                        onClick={() => destroyEvent(elem.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        </>
      )}
      <h2>Evenement <strong>à venir</strong></h2>
      <h2>Evenement <strong>déjà passé</strong></h2>
    </>
  );
};

export default Timetable;
