import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './flatPicture.css';
import url from 'data/url.json';

const FlatPictureUser = ({ user }) => {
  const [flatPicture, setFlatPicture] = useState('');
  const [email, setEmail] = useState('');

  fetch(`${url.url}members/${user.id}`, {
    method: 'get',
    headers: {
      Authorization: Cookies.get('token'),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.flat_picture) {
        const link = response.flat_picture.url;
        const linkStart = link.substring(0, 16);
        const linkMiddle = ':3000/';
        const linkEnd = link.substring(17, link.length);
        const constructor = linkStart + linkMiddle + linkEnd;
        setFlatPicture(constructor);
        setEmail(response.email);
      } else {
        setFlatPicture('');
      }
    });

  if (flatPicture !== '') {
    return (
      <>
        <img
          className="flat-picture"
          src={flatPicture}
          alt="photos de la colloc"
        />
      </>
    );
  }
  return (
    <div style={{ display: 'none' }}>
      <img
        className="flat-picture"
        src={flatPicture}
        alt="photos de la colloc"
      />
    </div>
  );
};

export default FlatPictureUser;
