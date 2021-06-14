import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import './index.css'
import Home from "pages/home"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sign_in from 'pages/sign_in'
import Sign_up from 'pages/sign_up'

const App = () => (
<Router>
  <Navbar/>
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
  </Switch>
 <Footer/>
</Router>

);

ReactDOM.render(<App />, document.getElementById("root"));