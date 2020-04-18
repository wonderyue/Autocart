import React, { Component, Fragment } from "react";
import {
  Grid,
  Pagination,
  Dropdown,
  Icon,
  Divider,
  Segment,
  Input,
} from "semantic-ui-react";
import ACItemList from "./ACItemList";
import { connect } from "react-redux";
import { CarListAction } from "@src/actions";
import {
  CHANGE_PAGE,
  CHANGE_ORDER,
  CHANGE_BRAND,
  CHANGE_CATEGORY,
  CHANGE_SEARCH,
  CHANGE_MIN_PRICE,
  CHANGE_MAX_PRICE,
  CHANGE_ENABLE,
} from "@src/constants";
import { compareObject } from "@src/utils/util";
import ScrollToTop from "./ScrollToTop";

const sortOptions = [
  {
    key: "Newest",
    text: "Newest",
    value: "-year",
  },
  {
    key: "Oldest",
    text: "Oldest",
    value: "year",
  },
  {
    key: "Lowest Price",
    text: "Lowest Price",
    value: "price",
  },
  {
    key: "Highest Price",
    text: "Highest Price",
    value: "-price",
  },
];

const brandOptions = [
  {
    key: "Toyota",
    text: "Toyota",
    value: "Toyota",
  },
  {
    key: "Honda",
    text: "Honda",
    value: "Honda",
  },
  {
    key: "Ford",
    text: "Ford",
    value: "Ford",
  },
  {
    key: "Nissan",
    text: "Nissan",
    value: "Nissan",
  },
  {
    key: "Kia",
    text: "Kia",
    value: "Kia",
  },
  {
    key: "Chevrolet",
    text: "Chevrolet",
    value: "Chevrolet",
  },
  {
    key: "Subaru",
    text: "Subaru",
    value: "Subaru",
  },
];

const categoryOptions = [
  {
    key: "Hatchback",
    text: "Hatchback",
    value: "Hatchback",
  },
  {
    key: "SUV",
    text: "SUV",
    value: "SUV",
  },
  {
    key: "Sedan",
    text: "Sedan",
    value: "Sedan",
  },
  {
    key: "Truck",
    text: "Truck",
    value: "Truck",
  },
];

const enableOptions = [
  {
    key: "Yes",
    text: "Yes",
    value: true,
  },
  {
    key: "No",
    text: "No",
    value: false,
  },
  {
    key: "All",
    text: "All",
    value: "all",
  },
];

class ACCarListView extends Component {
  componentDidMount() {
    this.props.getOnePage(
      this.props.isStaff,
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
        this.props.isStaff,
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

  handleBrandChange = (e, { value }) => {
    this.props.changeParam(CHANGE_BRAND, value);
  };

  handleCategoryChange = (e, { value }) => {
    this.props.changeParam(CHANGE_CATEGORY, value);
  };

  handleSearchChange = () => {
    this.props.changeParam(CHANGE_SEARCH, this.state.search);
  };

  handleMinPriceChange = () => {
    this.props.changeParam(CHANGE_MIN_PRICE, this.state.price__gte);
  };

  handleMaxPriceChange = () => {
    this.props.changeParam(CHANGE_MAX_PRICE, this.state.price__lte);
  };

  handleEnableChange = (e, { value }) => {
    this.props.changeParam(CHANGE_ENABLE, value);
  };

  renderStaff() {
    return (
      <Fragment>
        <Divider />
        <p>For sale</p>
        <Dropdown
          options={enableOptions}
          selection
          fluid
          closeOnChange
          value={this.props.filters.enable}
          onChange={this.handleEnableChange}
        />
      </Fragment>
    );
  }

  render() {
    return (
      <Grid style={{ margin: "1em 0em 1em 0em" }}>
        <Grid.Column style={{ width: "22em" }}>
          <Segment>
            <p>Price Range</p>
            <Input
              onChange={(e) => {
                this.setState({ price__gte: e.target.value });
              }}
              onBlur={this.handleMinPriceChange}
              type="number"
              style={{ maxWidth: "8em" }}
              defaultValue={this.props.filters.price__gte}
            />{" "}
            to{" "}
            <Input
              onChange={(e) => {
                this.setState({ price__lte: e.target.value });
              }}
              onBlur={this.handleMaxPriceChange}
              type="number"
              style={{ maxWidth: "8em" }}
              defaultValue={this.props.filters.price__lte}
            />
            <Divider />
            <p>Make</p>
            <Dropdown
              options={brandOptions}
              placeholder="Choose Brand"
              selection
              fluid
              multiple
              closeOnChange
              value={this.props.filters.brand}
              onChange={this.handleBrandChange}
            />
            <Divider />
            <p>Category</p>
            <Dropdown
              options={categoryOptions}
              placeholder="Choose Category"
              selection
              fluid
              multiple
              closeOnChange
              value={this.props.filters.category}
              onChange={this.handleCategoryChange}
            />
            {this.props.isStaff ? this.renderStaff() : null}
          </Segment>
        </Grid.Column>
        <Grid.Column
          width={12}
          style={{ minWidth: "50em", maxWidth: "60em", padding: "1em 0em" }}
        >
          <Grid columns={3}>
            <Grid.Column textAlign="left" verticalAlign="middle">
              <Input
                action={{
                  icon: "search",
                  onClick: this.handleSearchChange,
                }}
                placeholder="Search..."
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                }}
                onBlur={this.handleSearchChange}
                defaultValue={this.props.filters.search}
              />
            </Grid.Column>
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
          <ACItemList list={this.props.list} />
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
        <ScrollToTop />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.CarList,
    isStaff: state.Auth.isStaff,
  };
};

export default connect(mapStateToProps, {
  getOnePage: CarListAction.getOnePage,
  changeParam: CarListAction.changeParam,
})(ACCarListView);
