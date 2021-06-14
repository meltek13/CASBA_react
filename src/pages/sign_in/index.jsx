import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logIn } from "store-redux/index";
import "./sign_in.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.loged);

  const fetchFunction = (e) => {
    e.preventDefault();
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
        console.log(Cookies.get("token"));
        return response.json();
      })
      .then((userdata) => {
        if (Cookies.get("token") === "null") {
          console.log("nul nul nul");
        } else {
          console.log(userdata);
          Cookies.set("current_user_id", userdata.user.id);
          dispatch(logIn());
          history.push("/");
        }
      });
  };

  return (
    <div className="Register">
      <h2 className="h2-signup">Se connecter</h2>

      <form>
        <input
          className="input-log-signin"
          type="Email"
          name="Email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-log-signin"
          type="Password"
          name="Password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="btn-signin" type="submit" onClick={fetchFunction}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default SignIn;
