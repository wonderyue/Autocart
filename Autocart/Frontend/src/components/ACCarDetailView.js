import React, { Component } from "react";

class ACCarDetailView extends Component {
  state = {};
  render() {
    const carId = this.props.match.params.id;
    return <h2>{carId}</h2>;
  }
}

export default ACCarDetailView;
