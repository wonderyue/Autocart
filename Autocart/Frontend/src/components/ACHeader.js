import React, { Component } from "react";
import { Button, Menu, Modal } from "semantic-ui-react";
import ACLoginView from "./ACLoginView";
import { Link } from "react-router-dom";

class ACHeader extends Component {
  state = { activeItem: "home" };

  constructor(props) {
    super(props);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
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
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/cars"
            name="cars"
            active={activeItem === "cars"}
            onClick={this.handleItemClick}
          >
            Cars
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
          >
            Login
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/history"
            name="history"
            active={activeItem === "history"}
            onClick={this.handleItemClick}
          >
            History
          </Menu.Item>
          <Menu.Item position="right">
            <Button as={Link} to="/cart" icon="shop" color="blue" />
            <Modal
              size="small"
              trigger={
                <Button
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
