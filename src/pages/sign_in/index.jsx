import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logIn } from "store-redux/index";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Alert } from 'antd';


import "./sign_in.css";

const SignIn = (user_id) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.user.loged);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
  const verifyEmail =() => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(email)) {
      return "success"
    } else if (email.length === 0) {
      return ""
    } else {
      return "error"
    }
  }

  const findFlat = (user_id) => {
    fetch("http://localhost:3000/flatsharings", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((flat) => {
          if (flat.admin_id === parseInt(user_id)) {
            history.push("/dashboard/" + flat.id);
          }
        });
      });
  };

  const fetchFunction = (e) => {
      const data = {
        email,
        password,
      };
  
      fetch("http://localhost:3000/users/sign_in", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
          },
        }),
      })
        .then((response) => {
          Cookies.set("token", response.headers.get("authorization"));
          return response.json();
        })
        .then((userdata) => {
          if (Cookies.get("token") === "null") {
            document.querySelector(".invisible").classList.remove("invisible")
          } else {
            console.log(userdata);
            Cookies.set("current_user_id", userdata.user.id);
            dispatch(logIn());
            findFlat(Cookies.get("current_user_id"));
            history.push("/new_flat_sharing");
          }
        });
  }
  
  return (
<div>
  <h1>Connexion</h1>
  <Alert className="invisible" message="Mot de passe ou email invalide" type="warning" showIcon closable  />
  
<div className="Register">

<Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={fetchFunction}
    >
      <Form.Item
        label="Email"
        name="email"
        hasFeedback validateStatus={verifyEmail()}
        value={email}
        onChange={verifyEmail()}
        onChange={(e) => setEmail(e.target.value)}
        rules={[
          {
            required: true,
            message: 'Email invalide',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rules={[
          {
            required: true,
            message: 'Mot de passe invalide',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Se souvenir de moi</Checkbox>
      </Form.Item>
      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
         <br/>
         <br/>
        <p>
          Pas encore de compte ? <Link to="/sign_up">inscrivez-vous</Link>
       </p>
      </Form.Item>
    </Form>
</div>

</div>
  );
};

export default SignIn;
