import React, { Component } from "react";
import { Embed, Grid } from "semantic-ui-react";

class ACHomeView extends Component {
  state = {};
  render() {
    return (
      <Grid centered style={{ margin: "1em 0em 1em 0em" }}>
        <Grid.Column style={{ width: "60em" }}>
          <Embed
            style={{ width: "80em" }}
            id="Oq_VFGtEfig"
            source="youtube"
            autoplay
            defaultActive
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ACHomeView;
