import React, { useState } from "react";
import Cookies from "js-cookie";
import ButtonUpdate from "../../components/ButtonUpdate";

const EditProfil = () => {
  const [email, setEmail] = useState("");

  const update = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/members/" + Cookies.get("current_user_id"), {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Cookies.get("current_user_id"),
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  };

  return (
    <div className="content-input">
      <form>
        <input
          className="form"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <ButtonUpdate action={update} name="Modifier mon profil" />
      </form>
    </div>
  );
};

export default EditProfil;
