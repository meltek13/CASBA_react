import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const ButtonDelete = (props) => {
  return (
    <Link to="/sign_up" className="button-delete" onClick={props.action}>
      {props.name}
    </Link>
  );
};

export default ButtonDelete;
