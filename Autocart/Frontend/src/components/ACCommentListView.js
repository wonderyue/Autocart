import React, { Component, Fragment } from "react";
import {
  Grid,
  Pagination,
  Divider,
  Header,
  Comment,
  Rating,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { CommentListAction } from "@src/actions";
import { CHANGE_PAGE, MEDIA_URL } from "@src/constants";
import Moment from "react-moment";

class ACCommentListView extends Component {
  componentDidMount() {
    this.props.getOnePage(true, this.props.countPerPage, this.props.curPage, {
      carid: this.props.carid,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.curPage !== this.props.curPage ||
      prevProps.countPerPage !== this.props.countPerPage
    ) {
      this.props.getOnePage(true, this.props.countPerPage, this.props.curPage, {
        carid: this.props.carid,
      });
    }
  }

  handlePageChange = (e, { activePage }) => {
    this.props.changeParam(CHANGE_PAGE, activePage);
    window.scroll({ top: 0, left: 0 /*behavior: 'smooth'*/ });
  };

  renderItem(item) {
    return (
      <Comment key={item.id}>
        <Comment.Avatar src={MEDIA_URL + item.img} />
        <Comment.Content>
          <Comment.Author as="a">{item.name}</Comment.Author>
          <Comment.Metadata>
            <Moment fromNow>{item.createTime}</Moment>
          </Comment.Metadata>
          <Comment.Text>
            <Rating
              size="small"
              disabled
              defaultRating={item.rating}
              maxRating={5}
            />
            <p>{item.comment}</p>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }

  render() {
    return (
      <Grid centered style={{ margin: "1em 0em" }}>
        <Grid.Column
          style={{ minWidth: "50em", maxWidth: "60em", padding: "1em 0em" }}
        >
          <Header size="large">Reviews</Header>
          <Divider />
          <Comment.Group size="huge">
            {this.props.list.map((item, index) => this.renderItem(item))}
          </Comment.Group>
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
    ...state.CommentList,
  };
};

export default connect(mapStateToProps, {
  getOnePage: CommentListAction.getOnePage,
  changeParam: CommentListAction.changeParam,
})(ACCommentListView);
