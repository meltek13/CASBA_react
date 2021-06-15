import React, { useState } from "react";
import Cookies from "js-cookie";
import ButtonUpdate from "../../components/ButtonUpdate";

const EditProfil = () => {
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("avatar", avatar);

    fetch("http://localhost:3000/members/" + Cookies.get("current_user_id"), {
      method: "PUT",

      body: formData,
    })
      .catch((error) => console.log(error))
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
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={(event) => setAvatar(event.target.files[0])}
        />
        <ButtonUpdate action={update} name="Modifier mon profil" />
      </form>
    </div>
  );
};

export default EditProfil;
