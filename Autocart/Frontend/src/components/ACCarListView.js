import React, { Component } from "react";
import { Grid, Pagination } from "semantic-ui-react";
import ACItemList from "./ACItemList";
import { connect } from "react-redux";
import { getCarsList, changePage } from "@src/actions/ACCarListViewAction";

class ACCarListView extends Component {
  componentDidMount() {
    this.props.getCarsList(this.props.countPerPage, this.props.curPage);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.curPage !== this.props.curPage) {
      this.props.getCarsList(this.props.countPerPage, this.props.curPage);
    }
  }

  handlePageChange = (e, { activePage }) => {
    this.props.changePage(activePage);
    window.scroll({ top: 0, left: 0 /*behavior: 'smooth'*/ });
  };

  render() {
    return (
      <Grid style={{ margin: "1em 0em 1em 0em" }}>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={8} style={{ maxWidth: 600, padding: "1em 0em" }}>
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
        <Grid.Column width={4}></Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    curPage: state.CarList.curPage,
    countPerPage: state.CarList.countPerPage,
    count: state.CarList.count,
    list: state.CarList.list
  };
};

export default connect(mapStateToProps, { getCarsList, changePage })(
  ACCarListView
);
