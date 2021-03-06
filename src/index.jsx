import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './index.css';
import SignIn from 'pages/sign_in';
import SignUp from 'pages/sign_up';
import Dashboard from 'pages/dashboard';
import NewFlatSharing from 'pages/new_flatSharing';
import EditProfil from 'pages/editProfil';
import Home from 'pages/home';
import Expenses from 'pages/expense';
import Succes from 'pages/succes';
import AddRoomMate from 'pages/addRoomMate';
import Error403 from 'pages/error403';
import LandingPage from './pages/landingPage/index';
import store from './store-redux/store.js';
import Profil from './pages/profil';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Provider store={store}>
      <Navbar />
      <div id="app-container">
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
          <Route path="/home">
            <Home />
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
          <Route path="/expenses">
            <Expenses />
          </Route>
          <Route path="/succes/:email">
            <Succes />
          </Route>
          <Route path="/add-room-mate/:id">
            <AddRoomMate />
          </Route>
          <Route path="/error-403">
            <Error403 />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Provider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
