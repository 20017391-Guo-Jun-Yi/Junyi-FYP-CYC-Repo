import React, { Component } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import PlaygroundDataService from "../services/playground.service";
import "../style/Playground.css";
import human from "../pictures/human.png";
import playgroundimg from "../pictures/playground.png";

export default class PlaygroundCreate extends Component {
    constructor(props) {
        super(props);
        this.refreshState = this.refreshState.bind(this);
        this.addPlayground = this.addPlayground.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.etcChange = this.etcChange.bind(this);
        this.state = {
            playground_title: "",
            playground_description: "",
            playground_etc: 0,
            redirect: false
        };
    }

    componentDidMount() {
        //
    }

    // Refresh State
    refreshState() {
        this.setState({
            playground_title: "",
            playground_description: "",
            playground_etc: 0,
            redirect: false
        })
    }

    // Update playground
    addPlayground() {
        const data = {
            playground_title: this.state.playground_title,
            playground_description: this.state.playground_description,
            playground_etc: this.state.playground_etc
        }
        PlaygroundDataService.create(data)
            .then(response => {
                console.log(response.data);
                this.refreshState();
            })
            .catch(e => {
                console.log(e);
            });
        this.setState({
            redirect: true
        })
    }

    // Title Change
    titleChange(e) {
        this.setState({
            playground_title: e.target.value
        })
    }

    // Description Change
    descriptionChange(e) {
        this.setState({
            playground_description: e.target.value
        })
    }

    // Etc Change
    etcChange(e) {
        this.setState({
            playground_etc: e.target.value
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to='/playground' />
        }

        const { playground_title, playground_description, playground_etc } = this.state;
        return (
            <div>
                <a href="/home" type="button" class="btn btn-primary btn-Home"> Home </a>
                <a href="/playground" type="button" class="btn btn-primary btn-Home btn-Playground"> Playgrounds </a>
                <span class="dot"></span>
                <img src={human} alt="human" className="human-logo" />
                <nav className="navbar navbar-expand-md AllUser-bar fixedtop" >
                    <h2> Create New Playground </h2>
                </nav>
                <hr size="4" width="100%" />
                <text>
                    Home -&gt; Create New Playground
                </text>

                <div class="d-flex addForm">
                    <div class="form-group">
                        <label class="form-label" for="title">Playground Title</label>
                        <input type="text" id="title" name="title" value={playground_title} onChange={this.titleChange} />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="description">Description</label>
                        <input type="text" id="description" name="description" value={playground_description} onChange={this.descriptionChange} />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="etc">Etc</label>
                        <input type="number" id="etc" name="etc" value={playground_etc} onChange={this.etcChange} />
                    </div>
                    <button id="addPlayground" className="btn btn-primary" onClick={this.addPlayground}>Create</button>
                </div>
            </div>
        );
    }
}