import { React, useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logIn } from "store-redux/index";
import "./sign_up.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.loged);

  const findFlat = (user_id) => {
    fetch("http://localhost:3000/flatsharings", {
      method: "get",
    })
      .then((response) => response.json())
      .then((response) => {response.forEach(flat => {if (flat.admin_id === parseInt(user_id)) {
        history.push("/dashboard/" + flat.id)
      } else {history.push("/")}} )});
  };

  const fetchFunction = (e) => {
    confirmPassword === password && e.preventDefault();
    const data = {
      email,
      password,
    };

    fetch("http://localhost:3000/users", {
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
          findFlat(Cookies.get("current_user_id"))
        }
      });
  };

  return (
    <>
      <div className="Register">
        {/* <h2 className="h2-signup">Créer un compte</h2> */}
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
          <input
            className="input-log-signin"
            type="Password"
            name="Password"
            placeholder="Confirmation"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p>Déjà inscris ? <Link to="/sign_in">connectez-vous</Link></p>
          <button className="btn-signup" type="submit" onClick={fetchFunction}>
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
