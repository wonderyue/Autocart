import React, { Component, Fragment } from "react";
import { Button, Menu, Modal, Dropdown, Image } from "semantic-ui-react";
import ACLoginView from "./ACLoginView";
import ACSignupView from "./ACSignupView";
import { NavLink, Link, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "@src/actions/ACAuthAction";
import { MEDIA_URL } from "@src/constants";

class ACHeader extends Component {
  state = {};

  componentDidMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.username) {
      this.props.getUser(this.props.auth.userid);
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
        style={{ margin: "0em 0.5em 0em 0.5em", fontSize: "1em" }}
      />
    ) : null;

    const location = this.props.location;
    const background = location.state && location.state.background;
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
          style={{
            padding: "0.5em",
            marginBottom: "2em",
            color: "blue",
          }}
        >
          <Menu.Item as={NavLink} to="/" name="home" exact>
            Home
          </Menu.Item>
          <Menu.Item as={NavLink} to="/cars" name="cars">
            Cars
          </Menu.Item>
          {isAuthenticated ? (
            <Menu.Item as={NavLink} to="/history" name="history">
              Orders
            </Menu.Item>
          ) : null}
          <Menu.Item position="right">
            <Button as={Link} to="/cart" icon="shop" color="blue" />
            {isAuthenticated ? loggedin : guest}
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default withRouter(
  connect(mapStateToProps, { getUser, logout })(ACHeader)
);
