import React, { Component } from "react";
import { connect } from "react-redux";
import { CommentModelAction } from "@src/actions";
import {
  Segment,
  Grid,
  Form,
  GridColumn,
  Button,
  Divider,
  Rating,
  Header,
  Image,
} from "semantic-ui-react";

class ACCommentView extends Component {
  state = { rating: 5 };

  componentDidUpdate(prevProps) {
    if (prevProps.comment.id !== this.props.comment.id) {
      window.location.reload();
    }
  }

  handleRate = (e, { rating }) => this.setState({ rating });

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(event.target);
    var obj = {};
    formData.forEach((value, key) => (obj[key] = value));
    obj["rating"] = this.state.rating;
    obj["cart"] = this.props.item.id;
    this.props.addComment(obj);
  };

  renderItem = (item) => {
    return (
      <div style={{ margin: "1em" }}>
        <Image src={item.img} size="small" centered />
        <Header size="medium" textAlign="center">
          {item.name}
        </Header>
      </div>
    );
  };

  render() {
    const { item } = this.props;
    return (
      <Grid centered style={{ margin: "1em 0em 1em 0em" }}>
        <GridColumn style={{ minWidth: "50em", maxWidth: "60em" }}>
          <Header size="large" textAlign="center">
            Create Review
          </Header>
          <Segment>
            {this.renderItem(item)}
            <Form
              size="large"
              style={{ margin: "2em 5em 5em" }}
              onSubmit={this.handleSubmit}
            >
              <Header size="medium" textAlign="left">
                Overall rating
              </Header>
              <Rating
                name="rating"
                maxRating={5}
                defaultRating={this.state.rating}
                onRate={this.handleRate}
              />
              <Divider />
              <Header size="medium" textAlign="left">
                Write your review
              </Header>
              <Form.TextArea placeholder="" name="comment" maxLength="1024" />
              <Button color="blue" floated="right" size="large">
                SUBMIT
              </Button>
            </Form>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comment: state.Comment,
  };
};

export default connect(mapStateToProps, {
  addComment: CommentModelAction.create,
})(ACCommentView);
