import React, { useState, useEffect } from "react";
import Cookies, { remove } from "js-cookie";
import { useDispatch } from "react-redux";
import { logOut } from "store-redux/index";
import { useHistory } from "react-router-dom";
import ButtonDelete from "../../components/ButtonDelete";

const Profil = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

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
      <div>
        <h2> Bonjour, {email}</h2>
        <ButtonDelete action={deleteAccount} name="Supprimer mon compte" />
      </div>
    </>
  );
};

export default Profil;
