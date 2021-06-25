import React, { useState } from 'react';
import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Popover, Button, Input } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

import url from 'data/url.json';
import './addRoomMate.css';

const AddRoomMate = () => {
  const history = useHistory();
  const [guest, setGuest] = useState('');
  const { id } = useParams();

  const addGuest = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(guest.toString())) {
      history.push('/succes/' + 'bad-request');
    } else {
      fetch(`${url.url}flatsharings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pending_invitation: guest.toString(),
        }),
      })
        .then((response) => response.json())
        .then((userdata) => {
          history.push(`/succes/${guest.toString()}`);
        });
    }
  };
  return (
    <div>
      <h1>Invitation</h1>
      <form className="form-add-room-mate">
        <Input className="input-guest" placeholder="Jean@gmail.com" style={{ width: 150 }} onChange={(e) => setGuest(e.target.value)} />
        <Button className="btn-guest" type="primary" onClick={addGuest}>
          Envoyer une invitation
          <ArrowRightOutlined />
        </Button>
      </form>
    </div>

  );
};

export default AddRoomMate;
