import React, { Component } from "react";
import ReactDOM from "react-dom";
import ACHeader from "./ACHeader";
import ACListView from "./ACListView";

class App extends Component {
  render() {
    return (
      <div>
        <ACHeader />
        <ACListView />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
