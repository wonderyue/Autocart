import React, { Component } from "react";
import {
  Grid,
  Pagination,
  Dropdown,
  Icon,
  Menu,
  Divider,
  Segment,
  Input,
  Button
} from "semantic-ui-react";
import ACItemList from "./ACItemList";
import { connect } from "react-redux";
import {
  getCarsList,
  changePage,
  changeOrder,
  changeBrand,
  changeCategory,
  changeSearch,
  changeMinPrice,
  changeMaxPrice
} from "@src/actions/ACCarListViewAction";

const sortOptions = [
  {
    key: "Newest",
    text: "Newest",
    value: "-year"
  },
  {
    key: "Oldest",
    text: "Oldest",
    value: "year"
  },
  {
    key: "Lowest Price",
    text: "Lowest Price",
    value: "price"
  },
  {
    key: "Highest Price",
    text: "Highest Price",
    value: "-price"
  }
];

const brandOptions = [
  {
    key: "Toyota",
    text: "Toyota",
    value: "Toyota"
  },
  {
    key: "Honda",
    text: "Honda",
    value: "Honda"
  },
  {
    key: "Ford",
    text: "Ford",
    value: "Ford"
  },
  {
    key: "Nissan",
    text: "Nissan",
    value: "Nissan"
  },
  {
    key: "Kia",
    text: "Kia",
    value: "Kia"
  },
  {
    key: "Chevrolet",
    text: "Chevrolet",
    value: "Chevrolet"
  },
  {
    key: "Subaru",
    text: "Subaru",
    value: "Subaru"
  }
];

const categoryOptions = [
  {
    key: "Hatchback",
    text: "Hatchback",
    value: "Hatchback"
  },
  {
    key: "SUV",
    text: "SUV",
    value: "SUV"
  },
  {
    key: "Sedan",
    text: "Sedan",
    value: "Sedan"
  },
  {
    key: "Truck",
    text: "Truck",
    value: "Truck"
  }
];

class ACCarListView extends Component {
  componentDidMount() {
    this.props.getCarsList(
      this.props.countPerPage,
      this.props.curPage,
      this.props.orderBy,
      this.props.brand,
      this.props.category,
      this.props.search,
      this.props.minPrice,
      this.props.maxPrice
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.curPage !== this.props.curPage ||
      prevProps.orderBy !== this.props.orderBy ||
      prevProps.brand !== this.props.brand ||
      prevProps.category !== this.props.category ||
      prevProps.search !== this.props.search ||
      prevProps.minPrice !== this.props.minPrice ||
      prevProps.maxPrice !== this.props.maxPrice
    ) {
      this.props.getCarsList(
        this.props.countPerPage,
        this.props.curPage,
        this.props.orderBy,
        this.props.brand,
        this.props.category,
        this.props.search,
        this.props.minPrice,
        this.props.maxPrice
      );
    }
  }

  handlePageChange = (e, { activePage }) => {
    this.props.changePage(activePage);
    window.scroll({ top: 0, left: 0 /*behavior: 'smooth'*/ });
  };

  handleOrderChange = (e, { value }) => {
    this.props.changeOrder(value);
  };

  handleBrandChange = (e, { value }) => {
    this.props.changeBrand(value);
  };

  handleCategoryChange = (e, { value }) => {
    this.props.changeCategory(value);
  };

  handleSearchCHange = () => {
    this.props.changeSearch(this.state.search);
  };

  handleMinPriceChange = () => {
    this.props.changeMinPrice(this.state.minPrice);
  };

  handleMaxPriceChange = () => {
    this.props.changeMaxPrice(this.state.maxPrice);
  };

  render() {
    return (
      <Grid style={{ margin: "1em 0em 1em 0em" }}>
        <Grid.Column style={{ width: "22em" }}>
          <Segment>
            <p>Price Range</p>
            <Input
              onChange={e => {
                this.setState({ minPrice: e.target.value });
              }}
              onBlur={this.handleMinPriceChange}
              type="number"
              style={{ maxWidth: "8em" }}
            />{" "}
            to{" "}
            <Input
              onChange={e => {
                this.setState({ maxPrice: e.target.value });
              }}
              onBlur={this.handleMaxPriceChange}
              type="number"
              style={{ maxWidth: "8em" }}
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
              value={this.props.brand}
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
              value={this.props.category}
              onChange={this.handleCategoryChange}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column
          width={12}
          style={{ minWidth: "50em", padding: "1em 0em" }}
        >
          <Grid>
            <Grid.Column width={10}>
              <Input
                action={{
                  icon: "search",
                  onClick: this.handleSearchCHange
                }}
                placeholder="Search..."
                onChange={e => {
                  this.setState({ search: e.target.value });
                }}
                onBlur={this.handleSearchCHange}
              />
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              <Icon name="sort amount down" />
              Sort by:{" "}
              <Dropdown
                inline
                simple
                options={sortOptions}
                defaultValue={this.props.orderBy}
                position="right"
                onChange={this.handleOrderChange}
              />
            </Grid.Column>
          </Grid>
          <Divider />
          <ACItemList list={this.props.list} />
          <Grid className="center aligned">
            <Pagination
              activePage={this.props.curPage}
              totalPages={this.props.count / this.props.countPerPage}
              onPageChange={this.handlePageChange}
              className="ui pagination menu centered"
            />
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.CarList.list,
    curPage: state.CarList.curPage,
    countPerPage: state.CarList.countPerPage,
    orderBy: state.CarList.orderBy,
    count: state.CarList.count,
    brand: state.CarList.brand,
    category: state.CarList.category,
    search: state.CarList.search,
    minPrice: state.CarList.minPrice,
    maxPrice: state.CarList.maxPrice
  };
};

export default connect(mapStateToProps, {
  getCarsList,
  changePage,
  changeOrder,
  changeBrand,
  changeCategory,
  changeSearch,
  changeMinPrice,
  changeMaxPrice
})(ACCarListView);
