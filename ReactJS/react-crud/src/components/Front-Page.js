import React, { Component } from "react";
import Description from "../pictures/Description.png";

export default class FrontPage extends Component {
    render() {
        return (
            <div>
                <a href="/Login" type="button" class="btn btn-primary btn-Login">Login</a>
                <img src={Description} alt = "Description" className="App-Description" />
            </div>
        );
    }
}