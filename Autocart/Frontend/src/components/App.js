import React, { Component } from "react";
import ReactDOM from "react-dom";
import ItemCard from "./ItemCard";

class App extends Component {
  state = {};
  render() {
    return <h1>Hello World</h1>;
  }
}

ReactDOM.render(<ItemCard />, document.getElementById("app"));
