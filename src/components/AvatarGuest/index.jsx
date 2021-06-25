import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Modal, Popover, Select } from 'antd';
import './avatarGuest.css';
import data from 'data/status.json';
import url from 'data/url.json';

const MiniAvatar = ({ user }) => {
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState('status :');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  fetch(`${url.url}members/${user.id}`, {
    method: 'get',
    headers: {
      Authorization: Cookies.get('token'),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.avatar) {
        const link = response.avatar.url;
        const linkStart = link.substring(0, 16);
        const linkMiddle = ':3000/';
        const linkEnd = link.substring(17, link.length);
        const constructor = linkStart + linkMiddle + linkEnd;

        setAvatar(constructor);
      } else {
        setAvatar(
          'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png',
        );
      }
    });

  const update = (status) => {
    console.log(status);
    const formData = new FormData();
    formData.append('status', status);

    fetch(`${url.url}members/${user.id}`, {
      method: 'PUT',
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <div className="AvatarAndStatus">
        <Popover placement="leftBottom" content={user.email}>
          <label htmlFor="file" onClick={showModal}>
            <img
              className="avatar_dashboard"
              style={
                user?.color
                  ? { border: `3px solid ${user?.color}` }
                  : { border: '3px solid rgb(245, 245, 38)' }
              }
              src={avatar}
              alt="avatar"
            />
          </label>
        </Popover>

        {parseInt(Cookies.get('current_user_id')) === user.id ? (
          <Select
            defaultValue={user.status}
            style={{ width: 150 }}
            onChange={update}
          >
            {data.status.map((data) => (
              <Option value={data.status} key={data.slug}>
                {data.status}
              </Option>
            ))}
          </Select>
        ) : (
          <p style={{ width: 150 }}>{user.status}</p>
        )}

        <p>
          {' '}
          {user.solde}
          {' '}
          €
        </p>
        <div />
      </div>

      <Modal
        title={user.nickname ? user.nickname : user.email}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img
          style={
            user?.color
              ? { border: `3px solid ${user?.color}` }
              : { border: '3px solid rgb(245, 245, 38)' }
          }
          className="avatar_modal"
          src={avatar}
          alt="avatar"
        />
      </Modal>
    </div>
  );
};

export default MiniAvatar;
