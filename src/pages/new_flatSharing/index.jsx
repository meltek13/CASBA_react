import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { logIn } from "store-redux";


const NewFlatSharing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const loged = useSelector((state) => state.loged);

  const fetchFunction = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };

    fetch("http://localhost:3000/flatsharings", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flatsharing: {
          title: data.title,
          description: data.description,
        },
      }),
    })
      .then((response) => {
        Cookies.set("tokenFlatsharing", response.headers.get("authorization"));
        console.log(Cookies.get("tokenFlatsharing"));
        return response.json();
      })
      .then((userdata) => {
          console.log(userdata);
          history.push("/");
      });
  };

  return (
    <div className="Register">
      <h2 className="create-flatsharing">Créer une nouvelle collocation</h2>

      <form>
        <input
          className="input-title"
          type="title"
          name="Title"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input-description"
          type="description"
          name="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button id="btn-create-flatsharing" type="submit" onClick={fetchFunction}>
          Creer
        </button>
      </form>
    </div>
  );
};

export default NewFlatSharing;
