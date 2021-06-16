import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { flatOff, flatOn, logIn } from "store-redux/index";
import { Link } from "react-router-dom";
import "./sign_in.css";

const SignIn = (user_id) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.user.loged);
  const dashboard = useSelector((state) => state.flat.dashboard);

  const findFlat = (user_id) => {
    fetch("http://localhost:3000/flatsharings", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((flat) => {
          if (flat.admin_id === parseInt(user_id)) {
            dispatch(flatOn());
            console.log(dashboard);
            history.push("/dashboard/" + flat.id);
          } else {
            history.push("/");
            dispatch(flatOff());
            console.log(dashboard);
          }
        });
      });
  };

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
        return response.json();
      })
      .then((userdata) => {
        if (Cookies.get("token") === "null") {
          console.log("nul nul nul");
        } else {
          console.log(userdata);
          Cookies.set("current_user_id", userdata.user.id);
          dispatch(logIn());
          findFlat(Cookies.get("current_user_id"));
          history.push("/");
        }
      });
  };

  return (
    <div className="Register">
      <form>
        <input
          className="input-log-signin"
          type="Email"
          name="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-log-signin"
          type="Password"
          name="Password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Pas encore de compte ? <Link to="/sign_up">inscrivez-vous</Link>
        </p>
        <button className="btn-signup" type="submit" onClick={fetchFunction}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default SignIn;
