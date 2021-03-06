import React from 'react';
import './style.css';

const ButtonUpdate = (props) => (
  <button className="button-update" onClick={props.action}>
    {props.name}
  </button>
);

export default ButtonUpdate;
