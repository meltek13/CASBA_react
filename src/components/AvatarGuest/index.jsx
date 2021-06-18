import React, { useState } from "react";
import Cookies from "js-cookie";

import { Modal, Popover, Select } from 'antd';
import "./avatarGuest.css"
import data from "data/status.json";


const MiniAvatar = ({ user }) => {
    const [avatar, setAvatar] = useState("")
    const [status, setStatus] = useState("status")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


        fetch("http://localhost:3000/members/" + user.id, {
          method: "get",
          headers: {
            Authorization: Cookies.get("token"),
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
              console.log(response)
            if (response.avatar) {
                 let link = response.avatar.url;
                 let linkStart = link.substring(0, 16);
                 let linkMiddle = ":3000/";
                 let linkEnd = link.substring(17, link.length);
                 let constructor = linkStart + linkMiddle + linkEnd;
          
                setAvatar(constructor)
               
            } else {
                setAvatar("https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png")
            }
          });
        
          const update = (e) => {
            
            console.log(e)
            const formData = new FormData();
              formData.append("status", e);

            fetch("http://localhost:3000/members/" + user.id, {
              method: "PUT",
              body: formData,
            })
              .catch((error) => console.log(error))
              .then((response) => {
                console.log(response);
              });
          };
        


  return (
    <div>
          
      <div className="AvatarAndStatus">
        <Popover content={user.email}>
          <label htmlFor="file" onClick={showModal}>
            <img className="avatar_dashboard" src={avatar} alt="avatar" />
          </label>
        </Popover>

        <Select defaultValue={user.status} className="SelectStatus" style={{ width: 150 }} onChange={update}>
            {data.status.map(data => 
                <Option value={data.status}>{data.status}</Option>
             )}
        </Select>
      </div>

      <Modal
        title={user.email}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img className="avatar_modal" src={avatar} alt="avatar" />
      </Modal>

    </div>
  );
};

export default MiniAvatar;
