import React, { useState } from "react";
import Cookies from "js-cookie";
import ButtonUpdate from "../../components/ButtonUpdate";
import { useHistory } from "react-router-dom";

const EditProfil = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const update = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);

    fetch("http://localhost:3000/members/" + Cookies.get("current_user_id"), {
      method: "PUT",
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
        history.push("/profil");
      });
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
