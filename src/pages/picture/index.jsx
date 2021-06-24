import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import FlatPictureUser from "components/FlatPicture";
import url from "data/url.json";
import "./picture.css";
import { DownloadOutlined } from "@ant-design/icons";


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
    fetch(url.url + "flatsharings/" + id + "/dashboard")
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
    fetch(url.url + "members/" + Cookies.get("current_user_id"), {
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
      <form className="Picture">
        <input
          type="file"
          accept="image/*"
          name="file"
          id="file"
          className="inputfile"
          multiple={false}
          onChange={(event) => upload(event.target.files[0])}
        />

        <label for="file" className="post-picture">
          <DownloadOutlined /> Poste ta photo
        </label>

        <div className="flat-pic">
          {room?.admin ? (
            <FlatPictureUser user={room.admin} key={room.admin.id} />
          ) : (
            <div></div>
          )}

          {room?.guest?.map((user) =>
            verifyPresenceOfData(user) ? (
              <div>
                <FlatPictureUser user={user} key={user.id} />
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
      </form>
    </>
  );
};

export default Picture;
