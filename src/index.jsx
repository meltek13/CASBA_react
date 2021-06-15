import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "pages/sign_in";
import SignUp from "pages/sign_up";
import Dashboard from "pages/dashboard";
import NewFlatSharing from "pages/new_flatSharing";
import Profil from "./pages/profil";
import EditProfil from "pages/editProfil";
import store from "./store-redux/store.js";
import LandingPage from "./pages/landingPage/index";
import Calendar from "./pages/calendar";
import Home from 'pages/home';


const App = () => (
  <div id="app-container">
    <Router>
      <Provider store={store}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/sign_in">
            <SignIn />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/home" >
              <Home/>
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
          <Route path="/dashboard/:id">
            <Dashboard />
          </Route>
        </Switch>
        <Footer />
      </Provider>
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
