import React, { useState, useEffect } from "react";
import Cookies, { remove } from "js-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import BtnProfile from "../../components/BtnProfile";
import ButtonUpdate from "../../components/ButtonUpdate";
import "./profil.css";
import {
  EditOutlined,
  SettingFilled,
  EllipsisOutlined,
} from "@ant-design/icons";

const Profil = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [uploadAvatar, setUploadAvatar] = useState("");
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

  const refreshPage = () => {
    window.location.reload(false);
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
        if (response.nickname !== "") {
          setNickName(response.nickname);
        }
        if (response.avatar !== null) {
          setAvatar(response.avatar.url);
        }
      });
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  const upload = () => {
    const formData = new FormData();
    formData.append("avatar", uploadAvatar);
    fetch("http://localhost:3000/members/" + Cookies.get("current_user_id"), {
      method: "PUT",
      body: formData,
    })
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    upload();
  }, [uploadAvatar]);

  return (
    <>
      {avatar ? (
        <div className="profil-card">
          <div>
            <form>
              <div className="profil-card-top">
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="file"
                  class="inputfile"
                  multiple={false}
                  onChange={(event) => setUploadAvatar(event.target.files[0])}
                />
                <label for="file">
                  <img
                    className="avatar"
                    src={decodeUrlForImage(avatar)}
                    alt="avatar"
                  />
                </label>
              </div>
            </form>
          </div>
          <div className="profil-card-bottom">
            <p>
              <strong>Nickname :</strong> {nickName}
            </p>
            <p>
              <strong>Email :</strong> {email}
            </p>
            <p>
              <strong>Status :</strong>
            </p>
          </div>

          <div className="nav-profil">
            <div>
              <Link to="/edit_profil">
                <SettingFilled />
              </Link>
            </div>
            <div className="separate">|</div>
            <div>
              <EditOutlined />
            </div>
            <div className="separate">|</div>
            <div>
              <EllipsisOutlined />
            </div>
          </div>
        </div>
      ) : (
        <div className="profil-card">
          <div>
            <form>
              <div className="profil-card-top">
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="file"
                  class="inputfile"
                  multiple={false}
                  onChange={(event) => setUploadAvatar(event.target.files[0])}
                />
                <label for="file">
                  <img
                    className="avatar"
                    src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"
                    alt="avatar par defaut"
                  />
                </label>
              </div>
            </form>
          </div>
          <div className="profil-card-bottom">
            <p>
              <strong>Nickname :</strong> {nickName}
            </p>
            <p>
              <strong>Email :</strong> {email}
            </p>
            <p>
              <strong>Status :</strong>
            </p>
          </div>
          <div className="nav-profil">
            <div>
              <Link to="/edit_profil">
                <SettingFilled />
              </Link>
            </div>
            <div className="separate">|</div>
            <div>
              <EditOutlined />
            </div>
            <div className="separate">|</div>
            <div>
              <EllipsisOutlined />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;
