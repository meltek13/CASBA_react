import React, { useState } from "react";
import Cookies from "js-cookie";
import "./flatPicture.css";

const FlatPictureUser = ({ user }) => {
  const [flatPicture, setFlatPicture] = useState("");
  const [email, setEmail] = useState("");

  fetch("http://localhost:3000/members/" + user.id, {
    method: "get",
    headers: {
      Authorization: Cookies.get("token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.flat_picture) {
        let link = response.flat_picture.url;
        let linkStart = link.substring(0, 16);
        let linkMiddle = ":3000/";
        let linkEnd = link.substring(17, link.length);
        let constructor = linkStart + linkMiddle + linkEnd;
        setFlatPicture(constructor);
        setEmail(response.email);
      } else {
        setFlatPicture("");
      }
    });

  if (flatPicture !== "") {
    return (
      <>
        <img
          className="flat-picture"
          src={flatPicture}
          alt="photos de la colloc"
        />
        <p>Poste de: {email}</p>
      </>
    );
  } else {
    return (
      <div style={{ display: "none" }}>
        <img
          className="flat-picture"
          src={flatPicture}
          alt="photos de la colloc"
        />
      </div>
    );
  }
};

export default FlatPictureUser;
