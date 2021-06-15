import React, { useState, useEffect } from "react";
import Cookies, { remove } from "js-cookie";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "store-redux/index";
import { useHistory } from "react-router-dom";
import ButtonDelete from "../../components/ButtonDelete";
import "./profil.css";

const Profil = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  // fonction a  utiliser en local pour les images
  const decodeUrlForImage = (imageUrl) => {
    let link = imageUrl;
    let linkStart = link.substring(0, 16);
    let linkMiddle = ":3000/";
    let linkEnd = link.substring(17, link.length);
    let constructor = linkStart + linkMiddle + linkEnd;

    return constructor;
  };

  const fetchFunction = () => {
    fetch("http://localhost:3000/members/" + Cookies.get("current_user_id"), {
      method: "get",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setEmail(response.email);
        setId(response.id);
        if (response.avatar !== null) {
          setAvatar(response.avatar.url);
        }
      });
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  const deleteAccount = () => {
    fetch(`http://localhost:3000/members/${id}`, {
      method: "delete",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        Cookies.remove("token");
        Cookies.remove("current_user_id");
        dispatch(logOut());
        history.push("/");
      });
  };
  return (
    <>
      {avatar ? (
        <div className="profil-card">
          <img
            className="avatar"
            src={decodeUrlForImage(avatar)}
            alt="avatar"
          />
          <p>{email}</p>
          <Link to="/edit_profil"> Edit profil</Link>
          <ButtonDelete action={deleteAccount} name="Supprimer mon compte" />
        </div>
      ) : (
        <div className="profil-card">
          <img
            className="avatar"
            src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
            alt="avatar par defaut"
          />
          <p>{email}</p>
          <Link to="/edit_profil"> Edit profil</Link>
          <ButtonDelete action={deleteAccount} name="Supprimer mon compte" />
        </div>
      )}
    </>
  );
};

export default Profil;
