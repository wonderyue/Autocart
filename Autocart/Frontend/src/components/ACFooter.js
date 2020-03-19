import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

class ACFooter extends Component {
  state = {};
  render() {
    return (
      <div>
        <Segment
          inverted
          color="blue"
          textAlign="center"
          style={{ margin: "2em 0em 0em 0em" }}
          vertical
          height="100"
        ></Segment>
      </div>
    );
  }
}

export default ACFooter;
