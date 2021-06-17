import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const BtnProfile = (props) => {
  return (
    <Link to="/sign_up" onClick={props.action}>
      {props.name}
    </Link>
  );
};

export default BtnProfile;
