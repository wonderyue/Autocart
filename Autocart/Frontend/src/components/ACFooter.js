import React, { Component } from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
  Icon,
} from "semantic-ui-react";
import { MEDIA_URL } from "@src/constants";

class ACFooter extends Component {
  state = {};
  render() {
    return (
      <div>
        <Segment
          inverted
          vertical
          color="blue"
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Cotact Us" />
                <List link inverted>
                  <List.Item as="a">Address</List.Item>
                  <List.Item as="a">Phone</List.Item>
                  <List.Item as="a">Email</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Careers" />
                <List link inverted>
                  <List.Item as="a">Jobs</List.Item>
                  <List.Item as="a">University</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">About Autocart</List.Item>
                  <List.Item as="a">Social Responsibility</List.Item>
                  <List.Item as="a">Foundation</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as="h4" content="Social Media" />
                <p>
                  Our customer relations team is also happy to help via Facebook
                  and Twitter.
                </p>
                <Icon name="twitter square" size="big" />
                <Icon name="facebook square" size="big" />
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            <p>
              <Image
                as="a"
                centered
                size="mini"
                src={MEDIA_URL + "react.png"}
              />
              <Image
                as="a"
                centered
                size="tiny"
                src={MEDIA_URL + "django.png"}
              />
            </p>
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default ACFooter;
