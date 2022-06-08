import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataService from "../services/cyc-fyp.service";
import "../style/Playground.css";
import human from "../pictures/human.png";
import playgrounding from "../pictures/playground.png";
import { Collapse } from "bootstrap";

export default class PlaygroundDisplay extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.searchByTitle = this.searchByTitle.bind(this);
        this.sortByTitle = this.sortByTitle.bind(this);
        this.retrievePlaygrounds = this.retrievePlaygrounds.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.state = {
            Playgrounds: [],
            currentPlaygrounds: null,
            currentIndex: -1,
            searchPlayground: "",
            sortAscending: false
        };
    }

    // On first initialisation
    componentDidMount() {
        this.retrievePlaygrounds();
    }

    // On each update/focus
    componentDidUpdate() {
        if (this.state.searchPlayground == "") {
            this.retrievePlaygrounds();
        }
    }

    // Change search term
    onChangeSearch(term) {
        const searchPlayground = term.target.value;

        this.setState({
            searchPlayground: searchPlayground
        });
    }

    // Initiate search
    searchByTitle() {
        this.setState({
            currentPlayground: null,
            currentIndex: -1
        });

        const searchTerm = this.state.searchPlayground;

        if (searchTerm == "") {
            this.retrievePlaygrounds();
            return;
        }

        DataService.findByTitle(this.state.searchPlayground)
            .then(response => {
                this.setState({
                    Playgrounds: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    sortByTitle() {
        const { Playgrounds, sortAscending } = this.state;

        if (!sortAscending) {
            // Sort Ascending
            Playgrounds.sort((a, b) => (a.playground_title > b.playground_title) ? 1 : ((b.playground_title > a.playground_title) ? -1 : 0));
        } else {
            // Sort Descending
            Playgrounds.sort((a, b) => (a.playground_title < b.playground_title) ? 1 : ((b.playground_title < a.playground_title) ? -1 : 0));
        }

        // Set new sort status
        this.setState({
            sortAscending: !sortAscending
        });
    }

    // Collect playgrounds data
    retrievePlaygrounds() {
        DataService.getAllPlaygrounds()
            .then(response => {
                // Only update when there is add/delete action
                if (this.state.Playgrounds.length != response.data.length) {
                    this.setState({
                        Playgrounds: response.data
                    });
                    console.log(response.data);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    // Refresh
    refreshList() {
        this.retrievePlaygrounds();
        this.setState({
            currentPlaygrounds: null,
            currentIndex: -1
        });
    }

    render() {
        const { Playgrounds, searchPlayground } = this.state;
        return (
            <div>
                <a href="/home" type="button" class="btn btn-primary btn-Home"> Home </a>
                <a href="/playground" type="button" class="btn btn-primary btn-Home btn-Playground"> Playgrounds </a>
                <span class="dot"></span>
                <img src={human} alt="human" className="human-logo" />
                <nav className="navbar navbar-expand-md AllUser-bar fixedtop" >
                    <h2> Playground </h2>
                    <div class="d-flex">
                        <input
                            class="form-control SearchBar"
                            type="text"
                            placeholder="Search by title"
                            name="search playground"
                            aria-label="Search playground"
                            value={searchPlayground}
                            onChange={this.onChangeSearch}
                        />
                        <button class="btn btn-primary btn-Search" onClick={this.searchByTitle}>Search</button>
                    </div>
                </nav>
                <hr size="4" width="100%" />
                <text>
                    Home -&gt; All Playgrounds
                    <a href="/home/playground/new" type="button" class="btn btn-primary btn-Add addPlayground">Add Playground</a>
                </text>

                <button class="btn btn-primary" onClick={this.sortByTitle}>Sort</button>

                {Playgrounds && Playgrounds.map((Playground, index) => {
                    return (
                        <div class="card" key={Playground.playground_id}>
                            <img src={playgrounding} alt="playground" className="playground-logo" />
                            <div class="container">
                                <Link to={"/home/playground/index/" + Playground.playground_id}>
                                    <h2>{Playground.playground_title}</h2>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}