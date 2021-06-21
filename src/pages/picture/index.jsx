import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import FlatPictureUser from "components/FlatPicture";

const Picture = () => {
  const { id } = useParams();
  const [flatPicture, setFlatPicture] = useState("");
  const [room, setRoom] = useState([]);
  const history = useHistory();

  const verifyPresenceOfData = (data) => {
    if (JSON.stringify(data) === "null") {
      return false;
    } else {
      return true;
    }
  };

  const findUserRoom = () => {
    fetch("http://localhost:3000/flatsharings/" + id + "/dashboard")
      .then((response) => response.json())
      .then((response) => {
        setRoom(response);
      });
  };

  useEffect(() => {
    findUserRoom();
  }, []);

  const upload = (flatPicture) => {
    const formData = new FormData();
    formData.append("flat_picture", flatPicture);
    fetch("http://localhost:3000/members/" + Cookies.get("current_user_id"), {
      method: "PUT",
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
        history.go(0);
      });
  };

  return (
    <>
      <h1>Photos</h1>
      <form>
        <input
          type="file"
          accept="image/*"
          name="file"
          id="file"
          multiple={false}
          onChange={(event) => upload(event.target.files[0])}
        />
        <button type="submit" onClick={upload}>
          Ajouter une photo
        </button>
      </form>
      <div>
        {room?.admin ? (
          <FlatPictureUser user={room.admin} key={room.admin.id} />
        ) : (
          <div>salut</div>
        )}

        {room?.guest?.map((user) =>
          verifyPresenceOfData(user) ? (
            <div>
              <FlatPictureUser user={user} key={user.id} />
            </div>
          ) : (
            <div>salut</div>
          )
        )}
      </div>
    </>
  );
};

export default Picture;
