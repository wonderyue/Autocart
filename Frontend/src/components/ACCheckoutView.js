import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CartModelAction, OrderModelAction } from "@src/actions";
import {
  Segment,
  Item,
  Grid,
  Form,
  GridColumn,
  Label,
  Table,
  Button,
  Icon,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

class ACCheckoutView extends Component {
  state = { finished: false };

  componentDidMount() {
    this.props.getCartList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.order.id !== this.props.order.id) {
      this.setState({ finished: true });
      this.props.getCartList(); //refresh cart list
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(event.target);
    var obj = {};
    formData.forEach((value, key) => (obj[key] = value));
    obj["cars"] = [];
    let finishedList = [];
    this.props.cart.list.map((item) => {
      if (!item.saveForLater) {
        obj.cars.push(item.id);
        finishedList.push(item);
      }
    });
    this.setState({ finishedList });
    this.props.addOrder(obj);
    window.scroll({ top: 0, left: 0 /*behavior: 'smooth'*/ });
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
                  <a style={{ fontSize: "1.2em", color: "black" }}>
                    {item.amount}
                  </a>
                </Grid.Row>
              </Grid.Column>
            </Grid>
            {this.state.finished ? (
              <Icon
                style={{
                  position: "absolute",
                  top: "-15%",
                  right: "5%",
                  transform: "translateY(-50%)",
                }}
                name="check circle"
                size="huge"
                color="black"
              />
            ) : null}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  };

  renderTableRow(title, price, surfix) {
    return (
      <Table.Row>
        <Table.Cell>{title}</Table.Cell>
        <Table.Cell>
          <CurrencyFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix="$"
          />
          {surfix}
        </Table.Cell>
      </Table.Row>
    );
  }

  renderUnfinished(price) {
    return (
      <Grid centered>
        <Table basic="very" style={{ width: "40em", marginTop: "5em" }}>
          <Table.Body>
            {this.renderTableRow("MSRP", price)}
            {this.renderTableRow("Advertised Price", price - (price % 1000))}
            {this.renderTableRow(
              "Lease Payment",
              Math.floor(price / 72),
              "/mo"
            )}
          </Table.Body>
        </Table>
        <Form
          size="large"
          style={{ width: "40em", margin: "3em" }}
          onSubmit={this.handleSubmit}
        >
          <p className="header_large">Submit My Offer</p>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First Name"
              name="firstName"
            />
            <Form.Input fluid placeholder="Last Name" name="lastName" />
          </Form.Group>
          <Form.Input
            fluid
            icon="at"
            iconPosition="left"
            placeholder="Email"
            type="email"
            name="email"
          />
          <Form.Input
            fluid
            icon="phone"
            iconPosition="left"
            placeholder="Phone"
            type="tel"
            name="phone"
            required
          />
          <Form.TextArea
            label="Do you have any additional infomation?"
            placeholder="Ex: I'd like to buy a car in the next week (Optional)"
            name="message"
          />
          <Button color="blue" size="large">
            SUBMIT
          </Button>
        </Form>
      </Grid>
    );
  }

  renderFinished() {
    return (
      <Fragment>
        <Divider />
        <p className="header_big" style={{ margin: "2em 0em 1em" }}>
          Success, Your order has been placed.
        </p>
        <p>we will contact you to schedule a pick up day.</p>
        <Button
          as={Link}
          to="/cars/"
          style={{ margin: "2em 0em" }}
          floated="right"
          size="large"
          color="blue"
        >
          CONTINUE
        </Button>
      </Fragment>
    );
  }

  render() {
    let cart = [];
    let price = 0;
    this.props.cart.list.map((item) => {
      if (!item.saveForLater) {
        cart.push(item);
        price += item.price * item.amount;
      }
    });
    if (this.state.finished) cart = this.state.finishedList;
    return (
      <Grid centered style={{ margin: "1em 0em 1em 0em" }}>
        <GridColumn
          style={{ minWidth: "50em", maxWidth: "60em", padding: "1em 0em" }}
        >
          <p className="header_large" style={{ textAlign: "center" }}>
            {this.state.finished ? "Congratulations" : "Checkout"}
          </p>
          <Segment>
            <Item.Group divided>
              {cart.map((item) => this.itemComponent(item))}
            </Item.Group>
          </Segment>
          {this.state.finished
            ? this.renderFinished()
            : this.renderUnfinished(price)}
        </GridColumn>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.Cart,
    order: state.Order,
  };
};

export default connect(mapStateToProps, {
  getCartList: CartModelAction.list,
  addOrder: OrderModelAction.create,
})(ACCheckoutView);
