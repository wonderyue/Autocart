import React, { Component, Fragment } from "react";
import {
  Grid,
  Pagination,
  Dropdown,
  Icon,
  Divider,
  Segment,
  Item,
  Button,
  Modal,
  Header,
} from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { OrderListAction } from "@src/actions";
import { CHANGE_PAGE, CHANGE_ORDER } from "@src/constants";
import { compareObject } from "@src/utils/util";
import ACCommentView from "./ACCommentView";
import Moment from "react-moment";

const sortOptions = [
  {
    key: "Newest",
    text: "Newest",
    value: "-createTime",
  },
  {
    key: "Oldest",
    text: "Oldest",
    value: "createTime",
  },
];

class ACHistoryView extends Component {
  componentDidMount() {
    this.props.getOnePage(
      true,
      this.props.countPerPage,
      this.props.curPage,
      this.props.filters
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.curPage !== this.props.curPage ||
      prevProps.countPerPage !== this.props.countPerPage ||
      !compareObject(prevProps.filters, this.props.filters)
    ) {
      this.props.getOnePage(
        true,
        this.props.countPerPage,
        this.props.curPage,
        this.props.filters
      );
    }
  }

  handlePageChange = (e, { activePage }) => {
    this.props.changeParam(CHANGE_PAGE, activePage);
    window.scroll({ top: 0, left: 0 /*behavior: 'smooth'*/ });
  };

  handleOrderChange = (e, { value }) => {
    this.props.changeParam(CHANGE_ORDER, value);
  };

  renderItem(item) {
    return (
      <Item key={item.id}>
        <Item.Image src={item.img} size="medium" />
        <Item.Content>
          <Item.Header as="a">{item.name}</Item.Header>
          <Item.Description>
            <Header size="medium">
              <CurrencyFormat
                value={item.price * item.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix="Total: $"
              />
            </Header>
          </Item.Description>
          <Item.Extra>
            <Header size="small">Qty: {item.amount}</Header>
            <Button
              as={Link}
              to={`cars/${item.car}`}
              primary
              floated="right"
              size="medium"
            >
              See Detail
              <Icon name="right chevron" />
            </Button>
            {item.commented ? null : (
              <Modal
                trigger={
                  <Button floated="right" size="medium">
                    <Icon name="comment alternate" />
                    Write a Review
                  </Button>
                }
              >
                <ACCommentView item={item} />
              </Modal>
            )}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  render() {
    return (
      <Grid centered style={{ margin: "1em 0em 1em 0em" }}>
        <Grid.Column
          style={{ minWidth: "50em", maxWidth: "60em", padding: "1em 0em" }}
        >
          <Grid columns={3}>
            <Grid.Column></Grid.Column>
            <Grid.Column textAlign="center" verticalAlign="middle">
              <p style={{ fontSize: "2em" }}>{this.props.count} Found</p>
            </Grid.Column>
            <Grid.Column textAlign="right" verticalAlign="middle">
              <Icon name="sort amount down" />
              Sort by:{" "}
              <Dropdown
                inline
                simple
                options={sortOptions}
                defaultValue={this.props.filters.ordering}
                position="right"
                onChange={this.handleOrderChange}
              />
            </Grid.Column>
          </Grid>
          <Divider />
          {this.props.list.map((order, index) => (
            <Fragment key={index}>
              <Segment attached="top" color="blue" inverted>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header inverted size="medium" textAlign="left">
                        ORDER PLACED:{" "}
                        {
                          <Moment local format="LLL">
                            {order.createTime}
                          </Moment>
                        }
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Header inverted size="medium" textAlign="right">
                        ORDER#: {order.id}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Header inverted size="small" textAlign="left">
                        PAID: {order.paid ? "Yes" : "No"}
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Header inverted size="small" textAlign="right">
                        PICKED UP: {order.pickedUp ? "Yes" : "No"}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment attached="bottom" style={{ marginBottom: "2em" }}>
                <Item.Group key={index} divided>
                  {order.cars.map((car) => this.renderItem(car))}
                </Item.Group>
              </Segment>
            </Fragment>
          ))}
          <Divider />
          <Grid centered>
            <Pagination
              activePage={this.props.curPage}
              totalPages={this.props.count / this.props.countPerPage}
              onPageChange={this.handlePageChange}
              className="ui pagination menu centered"
              style={{ marginTop: "2em" }}
            />
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.OrderList,
  };
};

export default connect(mapStateToProps, {
  getOnePage: OrderListAction.getOnePage,
  changeParam: OrderListAction.changeParam,
})(ACHistoryView);
