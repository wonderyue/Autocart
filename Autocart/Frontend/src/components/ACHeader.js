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
  Modal
} from "semantic-ui-react";
import ACLoginView from "./ACLoginView";

class ACHeader extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    let refAccountBtn;
    return (
      <div>
        <Menu
          inverted
          color="blue"
          pointing
          secondary
          borderless
          style={{ padding: "0.5em", margin: "0em 0em 2em 0em" }}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Cars</Menu.Item>
          <Menu.Item position="right">
            <Button icon="shop" color="blue" />
            <Modal
              size="small"
              trigger={
                <Button
                  ref={node => (refAccountBtn = node)}
                  icon="user circle"
                  style={{ marginLeft: "0.5em" }}
                  color="blue"
                />
              }
            >
              <ACLoginView />
            </Modal>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default ACHeader;
