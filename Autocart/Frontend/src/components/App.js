import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import ACHeader from "./ACHeader";
import ACFooter from "./ACFooter";
import ACHomeView from "./ACHomeView";
import ACCarListView from "./ACCarListView";
import ACCarDetailView from "./ACCarDetailView";
import ACCartView from "./ACCartView";
import ACHistoryView from "./ACHistoryView";
import ACLoginView from "./ACLoginView";
import ACSignupView from "./ACSignupView";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  HashRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import { Segment } from "semantic-ui-react";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  combineReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    <Fragment>
      <ACHeader />
      <Segment style={{ minHeight: "85vh" }}>
        <Switch location={background || location}>
          <Route exact path="/" component={ACHomeView} />
          <Route exact path="/cars" component={ACCarListView} />
          <Route exact path="/cart" component={ACCartView} />
          <Route exact path="/history" component={ACHistoryView} />
          <Route path="/cars/:id" component={ACCarDetailView} />
        </Switch>
      </Segment>
      <ACFooter />
    </Fragment>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);