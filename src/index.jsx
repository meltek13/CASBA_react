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
import NewFlatSharing from 'pages/new_flatSharing'
import Profil from "./pages/profil";
import store from "./store-redux/store.js";
import { Provider } from "react-redux";
import Landing_page from './pages/landing page/index'



const App = () => (

  <div id="app-container">
    <Router>
        <Provider store={store}>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/landing_page">
              <Landing_page />
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
           <Route path="/new_flat_sharing">
             <NewFlatSharing />
           </Route>
          </Switch>
          <Footer />
        </Provider>
    </Router>
  </div>

);

ReactDOM.render(<App />, document.getElementById("root"));
