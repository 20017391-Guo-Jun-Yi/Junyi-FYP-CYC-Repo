import React, { Component } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import PlaygroundDataService from "../services/playground.service";
import "../style/Playground.css";
import human from "../pictures/human.png";
import playgroundimg from "../pictures/playground.png";

class PlaygroundDetails extends Component {
    constructor(props) {
        super(props);
        this.retrievePlayground = this.retrievePlayground.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.textBoxChange = this.textBoxChange.bind(this);
        this.updatePlayground = this.updatePlayground.bind(this);
        this.deletePlayground = this.deletePlayground.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.state = {
            Playground: {
                playground_id: null,
                playground_title: null,
                playground_description: null
            },
            id: null,
            Default: null,
            textBoxDisabled: true,
            redirect: false
        };
    }

    componentDidMount() {
        const { id } = this.props.params;
        this.setState({
            id: id
        })
        this.retrievePlayground(id);
    }

    // Collect Users data
    retrievePlayground(id) {
        PlaygroundDataService.get(id)
            .then(response => {
                this.setState({
                    Playground: response.data,
                    Default: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    // Enable editing of playground description
    enableEdit() {
        // Hide edit/delete, show update/cancel
        document.getElementById("editBtn").style.display = "none";
        document.getElementById("deleteBtn").style.display = "none";
        document.getElementById("updateBtn").style.display = "inline-block";
        document.getElementById("cancelBtn").style.display = "inline-block";

        // Enable text box for description
        this.setState({
            textBoxDisabled: false
        })
    }

    cancelEdit() {
        // Hide edit/delete, show update/cancel
        document.getElementById("editBtn").style.display = "inline-block";
        document.getElementById("deleteBtn").style.display = "inline-block";
        document.getElementById("updateBtn").style.display = "none";
        document.getElementById("cancelBtn").style.display = "none";

        // Disable textbox for description
        this.setState({
            Playground: this.state.Default,
            textBoxDisabled: true
        })
    }

    textBoxChange(e) {
        this.setState(prevState => ({
            Playground: {
                ...prevState.Playground,
                playground_description: e.target.value
            }
        }))
    }

    // Remove playground
    deletePlayground() { 
        const id = this.state.Playground.playground_id;
        PlaygroundDataService.delete(id)
            .then(response => {
                console.log(response.data);
                this.refreshData();
            })
            .catch(e => {
                console.log(e);
            });
        this.setState({
            redirect: true
        })
    }

    // Update playground
    updatePlayground() {
        const id = this.state.Playground.playground_id;
        PlaygroundDataService.update(id, this.state.Playground)
            .then(response => {
                console.log(response.data);
                this.refreshData(id);
            })
            .catch(e => {
                console.log(e);
            });
        this.cancelEdit();
    }

    // Refresh
    refreshData(id) {
        this.retrievePlayground(id);
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to='/playground' />
        }

        const { Playground, textBoxDisabled } = this.state;
        return (
            <div>
                <a href="/home" type="button" class="btn btn-primary btn-Home"> Home </a>
                <a href="/playground" type="button" class="btn btn-primary btn-Home btn-Playground"> Playgrounds </a>
                <span class="dot"></span>
                <img src={human} alt="human" className="human-logo" />
                <nav className="navbar navbar-expand-md AllUser-bar fixedtop" >
                    <h2> Playground </h2>
                </nav>
                <hr size="4" width="100%" />
                <text>
                    Home -&gt; All Playgrounds -&gt; {Playground.playground_id}
                    <a href="/playground/new" type="button" class="btn btn-primary btn-Add addPlayground">Add Playground</a>
                </text>

                <div class="card controls" key={Playground.playground_id}>
                    <img src={playgroundimg} alt="playground" className="playground-logo" />
                    <div class="container">
                        <h2>{Playground.playground_title}</h2>
                        <div class="buttons">
                            <button id="editBtn" className="btn btn-edit" onClick={this.enableEdit}>Edit</button>
                            <button id="deleteBtn" className="btn btn-danger" onClick={this.deletePlayground}>Delete</button>
                            <button id="updateBtn" className="btn btn-success" onClick={this.updatePlayground} style={{display: "none"}}>Update</button>
                            <button id="cancelBtn" className="btn btn-secondary" onClick={this.cancelEdit} style={{display: "none"}}>Cancel</button>
                        </div>
                    </div>
                </div>
                <div class="description">
                    <input type="text" id="description" name="description" 
                    value={Playground.playground_description} disabled={textBoxDisabled} 
                    onChange={this.textBoxChange} />
                </div>
            </div>
        );
    }
}

export default (props) => (
    <PlaygroundDetails
        {...props}
        params={useParams()}
    />
);