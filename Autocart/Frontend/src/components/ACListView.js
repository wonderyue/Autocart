import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import ACItemList from "./ACItemList";

class ACListView extends Component {
  state = {};
  render() {
    return (
      <Grid>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={8} style={{ maxWidth: 600, padding: "1em 0em" }}>
          <ACItemList />
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
      </Grid>
    );
  }
}

export default ACListView;
