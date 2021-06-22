import React, { Component } from "react";
import CardList from "../components/CardList";
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import SearchBar from "../components/SearchBar";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchBox: ''
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchBox: event.target.value })
    }

    render() {
        const { robots, searchBox } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchBox.toLowerCase());
        });
        return !robots.length ?
            <h1> loading... </h1> :
            (    <div className="tc">
                    <h1 className="f1 pa2 ma2 tc">robofriends</h1>
                    <SearchBar searchChange={this.onSearchChange} />
                    <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                    </Scroll>
                </div>
            );
            
        }
}

export default App;