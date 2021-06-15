import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./index.css";
import Home from "pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "pages/sign_in";
import SignUp from "pages/sign_up";
import NewFlatSharing from "pages/new_flatSharing";
import Profil from "./pages/profil";
import EditProfil from "pages/editProfil";
import store from "./store-redux/store.js";
import Landing_page from "./pages/landingPage/index";
import Calendar from "./pages/calendar";

const App = () => (
  <div id="app-container">
    <Router>
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Landing_page />
          </Route>
          <Route path="/sign_in">
            <SignIn />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
          <Route path="/edit_profil">
            <EditProfil />
          </Route>
          <Route path="/new_flat_sharing">
            <NewFlatSharing />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
        </Switch>
        <Footer />
      </Provider>
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
