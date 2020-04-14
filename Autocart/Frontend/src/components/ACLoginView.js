import React, { Component } from "react";
import {
  Button,
  Header,
  Image,
  Grid,
  Form,
  Segment,
  Message,
} from "semantic-ui-react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "@src/actions/ACAuthAction";
import { MEDIA_URL } from "@src/constants";

class ACLoginView extends Component {
  state = {};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

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
            LOG IN
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
              <Button color="blue" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?{" "}
            <Link
              to={{
                pathname: "/signup",
                state: { background: background },
              }}
            >
              Sign up
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

export default withRouter(connect(mapStateToProps, { login })(ACLoginView));
