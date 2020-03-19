import React, { Component } from "react";
import {
  Button,
  Header,
  Image,
  Grid,
  Form,
  Segment,
  Message
} from "semantic-ui-react";

class ACLoginView extends Component {
  state = {};
  render() {
    return (
      <Grid textAlign="center" style={{ margin: "5em" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Image src={require("@assets/icon.png")} /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button color="blue" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ACLoginView;
