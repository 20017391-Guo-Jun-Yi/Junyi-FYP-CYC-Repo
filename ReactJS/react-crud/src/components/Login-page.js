import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/Login.css";

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <form className="Loginform">
          <label className="Welcomeback"> Welcome Back!</label>
          <div className="input-group">
            <label htmlFor="email" className="inputlogin">Username </label>
            <input type="email" name="email" placeholder="Username" />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="inputlogin">Password </label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div>
            <Link to={"/home"}>
              <button className="btn btn-Login2">Login</button>
            </Link>
            <Link to={"/"}>
              <button className="btn btn-back2">Back</button>
            </Link>
          </div>
          <div>
            <Link to={"/passwordreset"}>
              <a className="forgetpassword">Forgot Password?</a>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}