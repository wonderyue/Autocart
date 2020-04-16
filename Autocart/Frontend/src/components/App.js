import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import ACHeader from "./ACHeader";
import ACFooter from "./ACFooter";
import ACHomeView from "./ACHomeView";
import ACCarListView from "./ACCarListView";
import ACCarDetailView from "./ACCarDetailView";
import ACCartView from "./ACCartView";
import ACHistoryView from "./ACHistoryView";
import ACCheckoutView from "./ACCheckoutView";
import ACAboutView from "./ACAboutView";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  HashRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { requestMiddleware } from "@src/middleware/requestMiddleware";
import PrivateRouter from "./PrivateRouter";

const initialState = {};

const middleware = [requestMiddleware, thunk];

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
          <PrivateRouter exact path="/cart" component={ACCartView} />
          <PrivateRouter exact path="/checkout" component={ACCheckoutView} />
          <PrivateRouter exact path="/history" component={ACHistoryView} />
          <Route exact path="/about" component={ACAboutView} />
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
