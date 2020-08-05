import React, { Component } from "react";
import { Item, Label, Button, Icon, Rating, Grid } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

class ACItemList extends Component {
  state = {
    list: this.props.list,
  };

  componentDidMount() {}

  render() {
    return (
      <Item.Group divided>
        {this.props.list.map((item, index) => (
          <Item key={index}>
            <Item.Image src={item.img} size="medium" />
            <Item.Content>
              <Item.Header as="a">
                {item.year + " " + item.name + " " + item.model}
              </Item.Header>
              <Item.Meta></Item.Meta>
              <Item.Extra>
                <Grid>
                  <Grid.Column floated="left" width={8}>
                    <p>Horsepower</p>
                    <p style={{ fontSize: "1.2em", color: "black" }}>
                      {item.horsepower}
                    </p>
                    <p>Combined Fuel Economy</p>
                    <p style={{ fontSize: "1.2em", color: "black" }}>
                      {item.mpg} MPG
                    </p>
                  </Grid.Column>
                  <Grid.Column floated="left" width={4}>
                    <p>Expert Rating</p>
                    <Rating
                      defaultRating={item.expertRating}
                      maxRating={5}
                      disabled
                    />
                    <p>Customer Rating</p>
                    <Rating
                      defaultRating={item.customerRating.rating}
                      maxRating={5}
                      disabled
                    />
                  </Grid.Column>
                </Grid>
                <Label as="a" size="huge" tag style={{ color: "green" }}>
                  <CurrencyFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="$"
                  />
                </Label>
                <Button
                  as={Link}
                  to={`cars/${item.id}`}
                  primary
                  floated="right"
                >
                  See Detail
                  <Icon name="right chevron" />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }
}

export default ACItemList;
