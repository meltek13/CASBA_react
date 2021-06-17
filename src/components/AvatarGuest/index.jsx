import React, { useState} from "react";
import Cookies from "js-cookie";
import { Tooltip} from 'antd';

const MiniAvatar = ({user}) => {
    const [avatar, setAvatar] = useState("")

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
        
      

      return (
        <Tooltip placement="bottom" title={user.email}>
        <label for="file">
            <img
            className="avatar_dashboard"
            src={avatar}
            alt="avatar"
            />
        </label>
    </Tooltip> 
      )
}

export default MiniAvatar