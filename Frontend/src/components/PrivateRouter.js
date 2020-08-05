import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PrivateRoute extends Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      const { history } = this.props;
      setTimeout(() => {
        history.push("/");
      }, 1000);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isAuthenticated !== this.props.isAuthenticated &&
      this.props.isAuthenticated == false
    ) {
      this.props.history.push("/");
    }
  }

  render() {
    let {
      component: Child,
      path = "/",
      exact = false,
      strict = false,
    } = this.props;
    return this.props.isAuthenticated ? (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        render={(props) => <Child {...props} />}
      />
    ) : null;
  }
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  component: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, {})(PrivateRoute));
