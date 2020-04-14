import React, { Component, Fragment } from "react";
import {
  Button,
  Menu,
  Modal,
  Dropdown,
  Image,
  Segment,
  Icon,
} from "semantic-ui-react";
import ACLoginView from "./ACLoginView";
import ACSignupView from "./ACSignupView";
import { NavLink, Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "@src/actions/ACAuthAction";
import { CartModelAction } from "@src/actions";
import { MEDIA_URL } from "@src/constants";

class ACHeader extends Component {
  state = {};

  componentDidMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.username) {
      this.props.getUser(this.props.auth.userid);
      this.props.getCartList();
    }
  }
  // back to the background of ModalView after successful login or signup
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      const location = this.props.location;
      const background = location.state && location.state.background;
      this.props.history.push(background.pathname);
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const username = this.props.auth.username || "guest";
    const avatar = this.props.auth.img ? (
      <Image
        avatar
        src={MEDIA_URL + this.props.auth.img}
        style={{ margin: "0em 0.5em" }}
      />
    ) : null;

    const location = this.props.location;
    const background = location.state && location.state.background;
    let cartCount = 0;
    this.props.cart.list.map((item) => {
      if (!item.saveForLater) cartCount++;
    });

    const guest = (
      <Modal
        trigger={
          <Button
            as={Link}
            to={{
              pathname: "/login",
              state: { background: this.props.location },
            }}
            icon="user circle"
            style={{ marginLeft: "0.5em" }}
            color="blue"
          />
        }
        onClose={() => {
          this.props.history.push(background.pathname);
        }}
      >
        {background && (
          <Switch>
            <Route exact path="/login" component={ACLoginView} />
            <Route exact path="/signup" component={ACSignupView} />
          </Switch>
        )}
      </Modal>
    );

    const loggedin = (
      <Fragment>
        {avatar}
        <Dropdown text={username} labeled floating className="icon white">
          <Dropdown.Menu direction="left">
            <Dropdown.Header icon="user" content={username} />
            <Dropdown.Divider />
            <Dropdown.Item
              as={Link}
              to="/history"
              icon="file alternate"
              text="History"
            />
            <Dropdown.Item
              icon="log out"
              text="Logout"
              onClick={this.handleLogout}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );

    return (
      <Segment inverted color="blue">
        <Menu size="huge" pointing secondary>
          <Menu.Item>
            <Image
              src={MEDIA_URL + "header.png"}
              size="medium"
              style={{ margin: "-1.5em 0em -1em -1.2em" }}
            />
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            className="white"
            to="/"
            name="home"
            exact
            style={{
              color: "white",
            }}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            className="white"
            to="/cars"
            name="cars"
            style={{
              color: "white",
            }}
          >
            Cars
          </Menu.Item>
          {isAuthenticated ? (
            <Menu.Item
              as={NavLink}
              className="white"
              to="/history"
              name="history"
              style={{
                color: "white",
              }}
            >
              Orders
            </Menu.Item>
          ) : null}
          <Menu.Item
            as={NavLink}
            className="white"
            to="/about"
            name="about"
            style={{
              color: "white",
            }}
          >
            About
          </Menu.Item>
          {isAuthenticated ? (
            <Fragment>
              <Menu.Item
                as={NavLink}
                className="white"
                to="/cart/"
                position="right"
                style={{
                  color: "white",
                }}
              >
                <Icon name="shop" />
                {cartCount ? "(" + cartCount + ")" : null}
              </Menu.Item>
              <Menu.Item>{loggedin}</Menu.Item>
            </Fragment>
          ) : (
            <Menu.Item position="right">{guest}</Menu.Item>
          )}
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.Auth,
  cart: state.Cart,
});

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    logout,
    getCartList: CartModelAction.list,
  })(ACHeader)
);
