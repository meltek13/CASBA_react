import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory, Link } from 'react-router-dom';

import { Input, Select } from 'antd';
import './profil.css';
import { EditOutlined, SettingFilled } from '@ant-design/icons';
import url from 'data/url.json';
import Color from 'data/colors.json';

const Profil = () => {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [avatar, setAvatar] = useState('');
  const history = useHistory();
  const [uploadAvatar, setUploadAvatar] = useState('');
  const [color, setColor] = useState('');
  const { Option } = Select;
  console.log(Color.colors);
  // fonction a  utiliser en local pour les images
  const decodeUrlForImage = (imageUrl) => {
    const link = imageUrl;
    const linkStart = link.substring(0, 16);
    const linkMiddle = ':3000/';
    const linkEnd = link.substring(17, link.length);
    const constructor = linkStart + linkMiddle + linkEnd;

    return constructor;
  };

  const fetchFunction = () => {
    fetch(`${url.url}members/${Cookies.get('current_user_id')}`, {
      method: 'get',
      headers: {
        Authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setEmail(response.email);
        if (response.nickname !== '') {
          setNickName(response.nickname);
        }
        if (response.color !== '') {
          setColor(response.color);
        }
        if (response.avatar !== null) {
          setAvatar(response.avatar?.url);
        }
      });
  };
  useEffect(() => {
    fetchFunction();
  }, []);

  const updateNickname = (nickname) => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    fetch(`${url.url}members/${Cookies.get('current_user_id')}`, {
      method: 'PUT',
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
      });
  };

  const changeColor = (c) => {
    const formData = new FormData();
    formData.append('color', c);
    fetch(`${url.url}members/${Cookies.get('current_user_id')}`, {
      method: 'PUT',
      body: formData,
    }).then((response) => {
      setColor(c);
    });
  };

  const upload = (avatar) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    fetch(`${url.url}members/${Cookies.get('current_user_id')}`, {
      method: 'PUT',
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
        history.go(0);
      });
  };

  const inputNickname = document.querySelector('.input-nickname');

  const borderSolid = () => {
    inputNickname.style.border = '1px solid rgb(208, 233, 255)';
  };

  const borderNone = () => {
    inputNickname.style.border = 'none';
  };

  return (
    <div className="center">
      <div className="profil-card">
        <div>
          <form>
            <div className="profil-card-top">
              <input
                type="file"
                accept="image/*"
                name="file"
                id="file"
                className="inputfile"
                multiple={false}
                onChange={(event) => upload(event.target.files[0])}
              />
              <label
                style={
                  color
                    ? { border: `6px solid ${color}` }
                    : { border: '6px solid rgb(245, 245, 38)' }
                }
                className="avatar"
                htmlFor="file"
              >
                <div className="cross">
                  <div className="tt">
                    <div className="horizontal" />
                    <div className="vertical" />
                  </div>
                </div>
                {avatar ? (
                  <img
                    className="avatar-img"
                    src={decodeUrlForImage(avatar)}
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="avatar-img"
                    src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                    alt="avatar par defaut"
                  />
                )}
              </label>
            </div>
          </form>
        </div>

        <div className="profil-card-bottom">
          <h2 className="title-Profil">Mes informations </h2>

          <div className="info-profil">
            <div className="info-left">
              <p>
                <strong>Pseudo :</strong>
              </p>
              <p>
                <strong>Couleur :</strong>
              </p>
              <br />
              <p className="strongEmail">
                <strong>Email :</strong>
              </p>
            </div>

            <div className="info-right">
              <p>
                <form className="pseudo">
                  <div>
                    <Input
                      className="input-nickname edit-email"
                      placeholder={nickName}
                      onChange={(event) => updateNickname(event.target.value)}
                    />
                  </div>
                  <div>
                    <Link to="#" className="edit-email" onClick={borderSolid}>
                      <EditOutlined />
                    </Link>
                    <div onClick={borderNone} type="submit" />
                  </div>
                </form>
              </p>

              <p className="color">
                <Select
                  defaultValue="Choisis une couleur 🎨"
                  style={{ width: 165 }}
                  onChange={changeColor}
                >
                  {Color.colors.map((data) => (
                    <Option value={data.color} key={data.slug}>
                      {data.slug}
                    </Option>
                  ))}
                </Select>
              </p>
              <br />
              <p className="email">
                <div>
                  {' '}
                  {email}
                </div>
                <div>
                  <Link className="edit-email" to="/edit_profil">
                    <SettingFilled />
                  </Link>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
