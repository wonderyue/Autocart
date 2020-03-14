import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";

class ItemCard extends Component {
  state = {
    name: "Porsche 718",
    price: 82000,
    year: 2019,
    des:
      "The 2019 Porsche 718 Boxster may be the marque’s least expensive convertible, but the 2-seater gives the 911 a serious run for the money.",
    imgUrl: "/static/frontend/img/Porsche-718.png"
  };

  render() {
    return (
      <Card>
        <Image src={this.state.imgUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Meta>
            <span className="date">{this.state.year}</span>
          </Card.Meta>
          <Card.Description>{this.state.des}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="dollar sign" />
            <CurrencyFormat
              value={this.state.price}
              displayType={"text"}
              thousandSeparator={true}
            />
          </a>
        </Card.Content>
      </Card>
    );
  }
}

export default ItemCard;
