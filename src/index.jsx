import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css'
import "antd/dist/antd.css";
import Home from "pages/home"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sign_in from 'pages/sign_in'
import Sign_up from 'pages/sign_up'
import Profil from "./pages/profil";
import store from "./store-redux/store.js";
import { Provider } from "react-redux";
import Calendar from './pages/calendar'



const App = () => (
  <Router>
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/sign_in">
          <Sign_in />
        </Route>
        <Route path="/sign_up">
          <Sign_up />
        </Route>
        <Route path="/profil">
          <Profil />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
      </Switch>
      <Footer />
    </Provider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
