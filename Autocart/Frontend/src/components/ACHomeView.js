import React, { Component } from "react";
import { Embed, Grid, Button, Header, GridColumn } from "semantic-ui-react";
import { MEDIA_URL } from "@src/constants";
import { Link } from "react-router-dom";

class ACHomeView extends Component {
  state = {};
  render() {
    return (
      <Grid
        centered
        style={{
          height: "120em",
          backgroundImage: `url(${MEDIA_URL + "bg3.jpg"})`,
          backgroundSize: "cover",
        }}
      >
        <Grid.Row>
          <Embed
            style={{ width: "90em", margin: "3em" }}
            id="Oq_VFGtEfig"
            source="youtube"
            aspectRatio="21:9"
            autoplay
            defaultActive
            hd
          />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header style={{ fontSize: "5em" }} inverted>
              AUTOCART
            </Header>
            <Button
              color="blue"
              size="big"
              style={{ marginTop: "5em" }}
              as={Link}
              to="/cars/"
              onClick={() => {
                window.scroll({ top: 0, left: 0 /*behavior: 'smooth'*/ });
              }}
            >
              Find your next car
            </Button>
            <p
              style={{
                position: "absolute",
                bottom: "0%",
                right: "0%",
                color: "white",
                margin: "0.2em",
              }}
            >
              Photo by Dimitar Donovski on Unsplash
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ACHomeView;
