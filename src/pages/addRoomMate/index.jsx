import React, { useState, useEffect } from 'react';
import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from 'data/url.json';
import './addRoomMate.css';
import { disconnect } from 'store-redux/room';
import { useDispatch } from 'react-redux';
import Email_svg from "assets/img/email.svg";
import Error403 from 'pages/error403';

const AddRoomMate = () => {
  const history = useHistory();
  const [guest, setGuest] = useState('');
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [yourDashboard, setYourDashboard] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const ItisYourDashboard = () => {
    
    fetch(`${url.url}flatsharings/${id}/dashboard`)
      .then((response) => response.json())
      .then((response) => {
        if (response?.status === 404 ){
          setYourDashboard(false);
        } else {
          if (Cookies.get('current_user_id')) {
            if (parseInt(Cookies.get('current_user_id')) === response.admin.id) {
              setYourDashboard(true);
            } else {
              response.guest.forEach((flatmate) => {
                if (flatmate !== null) {
                  if (flatmate.id === parseInt(Cookies.get('current_user_id'))) {
                    setYourDashboard(true);
                  }
                }
              });
            }
          }
        }
        
      });
  };

  useEffect(() => {
    ItisYourDashboard();
  }, []);

  const deleteFlatsharing = () => {
    fetch(`${url.url}flatsharings/${id}`  , {
      method: 'delete',
      headers: {
        Authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setIsModalVisible(false);
        Cookies.remove('flat_id');
        dispatch(disconnect());
        history.push("/")
      });
  };

  return (
    <>
    {yourDashboard ? (
    <div>
       
      <img id="email-svg" src={Email_svg} alt="illustration enveloppe avec femme sur un skate" />
      <h1>Invitation</h1>
      <muted>(Invite tes collocs ?? rejoindre Casba)</muted>
      <form className="form-add-room-mate">
        <Input className="input-guest" placeholder="Jean@gmail.com" style={{ width: 150 }} onChange={(e) => setGuest(e.target.value)} />
        <Button className="btn-guest" type="primary" onClick={addGuest}>
          Envoyer une invitation
          <ArrowRightOutlined />
        </Button>
      </form>
      <Button type="text" onClick={showModal} danger>
      Supprimer la collocation ?
    </Button>
      <Modal title="Supprimer la colloc" visible={isModalVisible} onOk={deleteFlatsharing} onCancel={handleCancel}>
        <p>Cette action est irr??versible, est-tu s??re de vouloir supprimer la collocation ?</p>
      </Modal>
    </div>)
    :(<Error403 />)}
    </>

  );
};

export default AddRoomMate;

