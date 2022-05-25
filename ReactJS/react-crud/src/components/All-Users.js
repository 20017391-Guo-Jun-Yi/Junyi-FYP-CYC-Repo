import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../services/cyc-fyp.service";
import "../style/All-Users.css";
import human from "../pictures/human.png";

export default class AllUserList extends Component {
    constructor(props) {
        super(props);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.state = {
            Users: [],
            currentUsers: null,
            currentIndex: -1,
            searchUser: ""
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    // Collect Users data
    retrieveUsers() {
        UserDataService.getAll()
            .then(response => {
                this.setState({
                    Users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    // Refresh
    refreshList() {
        this.retrieveUsers();
        this.setState({
            currentUsers: null,
            currentIndex: -1
        });
    }

    render() {
        const { Users } = this.state;
        return (
            <div>
                <a href="/home" type="button" class="btn btn-primary btn-Home"> Home </a>
                <span class="dot"></span>
                <img src={human} alt="human" className="human-logo" />
                <nav className="navbar navbar-expand-md AllUser-bar fixedtop">
                    <h2> Users </h2>
                    <form class="d-flex" method="POST" action="/" no validate>
                        <input
                            class="form-control SearchBar"
                            type="search user"
                            placeholder="Search user"
                            name="search user"
                            aria-label="Search user"
                        />
                        <button class="btn btn-primary btn-Search" >Search</button>
                    </form>
                </nav>
                <hr size="4" width="100%" />
                <text>
                    Home -&gt; All Users
                    <a href="./AddUser" type="button" class="btn btn-primary btn-Add User">Add User</a>
                </text>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>No.</th>
                            <th style={{ textAlign: "center" }}>Name</th>
                            <th style={{ textAlign: "center" }}>Age</th>
                            <th style={{ textAlign: "center" }}>Gender</th>
                            <th style={{ textAlign: "center" }}>Email</th>
                            <th style={{ textAlign: "center" }}>Organization</th>
                            <th style={{ textAlign: "center" }}>Role</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users && Users.map((User, index) => {
                            return (
                                <tr key={User.user_id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{User.username}</td>
                                    <td>{User.age}</td>
                                    <td>{User.gender}</td>
                                    <td>{User.school_email}</td>
                                    <td>{User.organisation}</td>
                                    <td>{User.role}</td>
                                    <tr>
                                        <Link to={"/home/viewuser/" + User.user_id}>
                                            <button className="btn btn-view">View</button>
                                        </Link>
                                        <Link to={"/home/edituser/" + User.user_id}>
                                        <button className="btn btn-edit">Edit</button>
                                        </Link>
                                    </tr>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        );
    }
}