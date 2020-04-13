import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CartModelAction } from "@src/actions";
import {
  Button,
  Icon,
  Segment,
  Item,
  Grid,
  Divider,
  GridColumn,
  Label,
  Dropdown,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

function quantityOptions() {
  let options = [];
  for (let index = 1; index <= 5; index++) {
    options.push({ key: index, text: index, value: index });
  }
  return options;
}

class ACCartView extends Component {
  state = {};
  componentDidMount() {
    this.props.getCartList();
  }

  handleQuantityChange = (item, value) => {
    this.props.updateCart(item.id, { amount: value });
  };

  handleDelete = (item) => {
    this.props.removeFromCart(item.id);
  };

  handleSaveForLater = (item) => {
    this.props.updateCart(item.id, { saveForLater: !item.saveForLater });
  };

  itemComponent = (item) => {
    return (
      <Item key={item.id}>
        <Item.Image src={item.img} size="small" />
        <Item.Content>
          <Item.Header as="a">{item.name}</Item.Header>
          <Item.Meta>
            <Label as="a" size="large" tag style={{ color: "green" }}>
              <CurrencyFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix="$"
              />
            </Label>
          </Item.Meta>
          <Item.Extra>
            <Grid>
              <Grid.Column width={8}>
                <Grid.Row>
                  <a style={{ fontSize: "1.2em", color: "black" }}>Qty: </a>
                  {item.saveForLater ? (
                    <a style={{ fontSize: "1.2em", color: "black" }}>
                      {item.amount}
                    </a>
                  ) : (
                    <Dropdown
                      label="Qty:"
                      floating
                      labeled
                      button
                      className="icon"
                      options={quantityOptions()}
                      defaultValue={item.amount}
                      style={{ maxWidth: "8em" }}
                      onChange={(e, data) => {
                        this.handleQuantityChange(item, data.value);
                      }}
                    />
                  )}
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={4} floated="right">
                <a
                  style={{ fontSize: "1.2em" }}
                  as="Button"
                  color="blue"
                  onClick={() => this.handleDelete(item)}
                >
                  Delete
                </a>
              </Grid.Column>
              <Grid.Column width={4} floated="right">
                <a
                  style={{ fontSize: "1.2em" }}
                  as="Button"
                  color="blue"
                  onClick={() => this.handleSaveForLater(item)}
                >
                  {item.saveForLater ? "Move to Cart" : "Save for later"}
                </a>
              </Grid.Column>
            </Grid>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  };

  renderEmptyCart() {
    return (
      <Fragment>
        <Header size="large">Your cart is empty</Header>
        <Button as={Link} to="/cars/" primary>
          EXPLORE CARS
        </Button>
      </Fragment>
    );
  }

  renderCart() {
    let cart = [];
    let save = [];
    this.props.list.map((item) => {
      if (item.saveForLater) save.push(item);
      else cart.push(item);
    });
    return (
      <Grid centered style={{ margin: "1em 0em 1em 0em" }}>
        <GridColumn
          style={{ minWidth: "50em", maxWidth: "60em", padding: "1em 0em" }}
        >
          {cart.length > 0 ? (
            <Fragment>
              <Grid.Row>
                <Button as={Link} to="/checkout/" primary floated="right">
                  Check Out
                  <Icon name="right chevron" />
                </Button>
                <Header size="large">Shopping Cart</Header>
              </Grid.Row>
              <Divider />
              <Segment>
                <Item.Group divided>
                  {cart.map((item) => this.itemComponent(item))}
                </Item.Group>
              </Segment>
            </Fragment>
          ) : null}
          {save.length > 0 ? (
            <Fragment>
              <Header size="large">Save For Later</Header>
              <Divider />
              <Segment>
                <Item.Group divided>
                  {save.map((item) => this.itemComponent(item))}
                </Item.Group>
              </Segment>
            </Fragment>
          ) : null}
        </GridColumn>
      </Grid>
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.list.length > 0
          ? this.renderCart()
          : this.renderEmptyCart()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.Cart,
  };
};

export default connect(mapStateToProps, {
  getCartList: CartModelAction.list,
  updateCart: CartModelAction.update,
  removeFromCart: CartModelAction.delete,
})(ACCartView);
