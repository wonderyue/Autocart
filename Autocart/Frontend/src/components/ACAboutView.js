import React, { Component } from "react";
import { Image, Grid } from "semantic-ui-react";
import { MEDIA_URL } from "@src/constants";

class ACAboutView extends Component {
  state = {};
  render() {
    return (
      <Grid
        centered
        style={{
          margin: "1em 0em 1em 0em",
        }}
      >
        <Grid.Column style={{ width: "60em" }}>
          <Image src={MEDIA_URL + "stack.png"} centered />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ACAboutView;
