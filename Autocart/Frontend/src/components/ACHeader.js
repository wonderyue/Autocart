import React, { Component, Fragment } from "react";
import { Button, Menu, Modal, Dropdown, Image } from "semantic-ui-react";
import ACLoginView from "./ACLoginView";
import ACSignupView from "./ACSignupView";
import {
  Link,
  HashRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "@src/actions/ACAuthAction";
import { USER_ID } from "@src/constants";

class ACHeader extends Component {
  state = { activeItem: "home", isModalOpen: false };

  componentDidMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.username) {
      this.props.getUser(this.props.auth.userid);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated &&
      this.props.auth.isAuthenticated
    ) {
      this.setState({ isModalOpen: false });
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { activeItem } = this.state;
    const { isAuthenticated } = this.props.auth;
    const username = this.props.auth.username || "guest";
    const avatar = this.props.auth.img ? (
      <Image
        avatar
        src={require("@assets/" + this.props.auth.img)}
        style={{ margin: "0em 0.5em 0em 0.5em", fontSize: "16" }}
      />
    ) : null;

    let location = this.props.location;
    let background = location.state && location.state.background;

    const guest = (
      <Modal
        trigger={
          <Button
            as={Link}
            to={{
              pathname: "/login",
              state: { background: this.props.location }
            }}
            icon="user circle"
            style={{ marginLeft: "0.5em" }}
            color="blue"
          />
        }
      >
        {background && <Route exact path="/login" component={ACLoginView} />}
        {background && <Route exact path="/signup" component={ACSignupView} />}
      </Modal>
    );

    const loggedin = (
      <Fragment>
        {avatar}
        <Dropdown text={username} labeled simple className="icon">
          <Dropdown.Menu>
            <Dropdown.Header content={username} />
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="/history" text="History" />
            <Dropdown.Item text="Logout" onClick={this.handleLogout} />
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );

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
          <Menu.Item position="right">
            <Button as={Link} to="/cart" icon="shop" color="blue" />
            {isAuthenticated ? loggedin : guest}
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.Auth
});

export default withRouter(
  connect(mapStateToProps, { getUser, logout })(ACHeader)
);
