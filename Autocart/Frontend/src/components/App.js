import React, { Component } from "react";
import ReactDOM from "react-dom";
import ACHeader from "./ACHeader";
import ACFooter from "./ACFooter";
import ACCarListView from "./ACCarListView";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

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
      <div>
        <ACHeader />
        <ACCarListView />
        <ACFooter />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
