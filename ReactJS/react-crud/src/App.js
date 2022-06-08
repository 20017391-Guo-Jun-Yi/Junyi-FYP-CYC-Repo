import React, { Component } from "react";
import { Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logo from './pictures/CYC-Logo.png';
import AllUserList from "./components/All-Users";
import FrontPage from "./components/Front-Page";
import LoginPage from "./components/Login-page";
import PlaygroundDisplay from "./components/Playground-Display";
import PlaygroundDetails from "./components/Playground-Details";
import PlaygroundCreate from "./components/Playground-Create";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md nav-bar fixedtop">
          <a className="navbar-brand">
            <img src={Logo} className="App-Logo" />
          </a>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<FrontPage />} />
            <Route exact path="/Login" element={<LoginPage />} />
            <Route exact path="/home/AllUsers" element={<AllUserList />} />
            <Route exact path="/home/playground" element={<PlaygroundDisplay />} />
            <Route path="/home/playground/index/:id" element={<PlaygroundDetails />} />
            <Route exact path="/home/playground/new" element={<PlaygroundCreate />} />
          </Routes>
        </div>  
      </div>
    );
  }
}
export default App;
