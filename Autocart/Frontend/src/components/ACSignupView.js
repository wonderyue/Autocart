import React, { Component } from "react";
import {
  Button,
  Header,
  Image,
  Grid,
  Form,
  Icon,
  Message,
  Segment,
  Card,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup, signupFail } from "@src/actions/ACAuthAction";
import { MEDIA_URL } from "@src/constants";

class ACSignuoView extends Component {
  state = { img: "avatars/1.png" };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      this.props.signupFail({ password: "passwords didn't match" });
      return;
    }
    this.props.signup(this.state.username, this.state.password, this.state.img);
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleAvatarChange = (value) => {
    this.setState({ img: value });
  };

  render() {
    const errorMsg = this.props.errorMsg;
    const MessageBox = errorMsg ? (
      <Message negative>
        {Object.keys(errorMsg).map((key, index) => (
          <p key={index}>
            {key == "non_field_errors"
              ? errorMsg[key]
              : key + ":" + errorMsg[key]}
          </p>
        ))}
      </Message>
    ) : null;
    const location = this.props.location;
    const background = location.state && location.state.background;
    let avatars = [];
    for (var i = 1; i <= 8; i++) {
      let img = "avatars/" + i + ".png";
      avatars.push(
        <Card key={i} onClick={() => this.handleAvatarChange(img)}>
          <Image src={MEDIA_URL + img} size="small" />
          {this.state.img === img ? (
            <Icon
              style={{ position: "absolute", bottom: "0%", right: "-4%" }}
              name="check"
              size="big"
              color="blue"
            />
          ) : null}
        </Card>
      );
    }

    return (
      <Grid
        textAlign="center"
        style={{ margin: "0em 5em 5em" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Image src={MEDIA_URL + "icon.png"} size="medium" centered />
          <Header
            as="a"
            size="large"
            color="blue"
            textAlign="center"
            style={{ margin: "1em" }}
          >
            SIGN UP
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="password2"
                onChange={this.handleChange}
              />
              <Segment>
                <p style={{ color: "blue" }}>Select your avatar</p>
                <Card.Group itemsPerRow={4}>{avatars}</Card.Group>
              </Segment>
              <Button color="blue" fluid size="large">
                Create account
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account?{" "}
            <Link
              to={{
                pathname: "/login",
                state: { background: background },
              }}
            >
              Log in
            </Link>
          </Message>
          {MessageBox}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  errorMsg: state.Auth.errorMsg,
});

export default withRouter(
  connect(mapStateToProps, { signup, signupFail })(ACSignuoView)
);
