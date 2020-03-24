import React, { Component } from "react";
import { Item, Label, Button, Icon, Rating } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

class ACItemList extends Component {
  state = {
    list: this.props.list
  };

  componentDidMount() {}

  render() {
    return (
      <Item.Group divided>
        {this.props.list.map((item, index) => (
          <Item key={index}>
            <Item.Image src={require("@assets/" + item.img)} size="medium" />
            <Item.Content>
              <Item.Header as="a">{item.year + " " + item.name}</Item.Header>
              <Item.Meta>
                <a>
                  <Icon name="dollar sign" />
                </a>
                <CurrencyFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </Item.Meta>
              <Item.Description>{item.des}</Item.Description>
              <Item.Extra>
                <Label>Horsepower {item.horsepower}</Label>
                <Label>MPG {item.mpg}</Label>
                <Rating defaultRating={3} maxRating={5} disabled />
                <Link to={`cars/${item.id}`}>
                  <Button primary floated="right">
                    See Detail
                    <Icon name="right chevron" />
                  </Button>
                </Link>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }
}

export default ACItemList;
