import React, { Component } from "react";
import ReactDOM from "react-dom";
import ACHeader from "./ACHeader";
import ACFooter from "./ACFooter";
import ACHomeView from "./ACHomeView";
import ACCarListView from "./ACCarListView";
import ACCarDetailView from "./ACCarDetailView";
import ACLoginView from "./ACLoginView";
import ACCartView from "./ACCartView";
import ACHistoryView from "./ACHistoryView";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  combineReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

class App extends Component {
  render() {
    return (
      <Router>
        <ACHeader />
        <Segment style={{ minHeight: "90vh" }}>
          <Switch>
            <Route exact path="/" component={ACHomeView} />
            <Route exact path="/cars" component={ACCarListView} />
            <Route exact path="/login" component={ACLoginView} />
            <Route exact path="/cart" component={ACCartView} />
            <Route exact path="/history" component={ACHistoryView} />
            <Route path="/cars/:id" component={ACCarDetailView} />
          </Switch>
        </Segment>
        <ACFooter />
      </Router>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
