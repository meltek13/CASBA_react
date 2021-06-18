import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "store-redux/index";
import "./editProfil.css";
import { Form, Input, Button} from "antd";
import {  MailOutlined } from "@ant-design/icons";

const EditProfil = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

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


  const deleteAccount = () => {
    fetch(`http://localhost:3000/members/` + Cookies.get("current_user_id"), {
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
    <div className="editProfil">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={update}
          >
            Modifier mon profil
          </Button>
          <a href="/sign_up" onClick={deleteAccount}>
            Supprimer mon compte
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfil;
