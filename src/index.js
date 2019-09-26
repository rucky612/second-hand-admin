/* eslint-disable */
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom"
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";
import "./style/global-style.css";
import "./style/antd-overrides.css";
import "react-table/react-table.css";
import App from "./components/App";

export const history = createBrowserHistory();

const buildStore = history => {
  const sagaMiddleware = createSagaMiddleware();
  const middles = [sagaMiddleware];
  const enhancers = [];
  if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }
  const composedEnhancers = compose(
    applyMiddleware(...middles),
    ...enhancers
  );
  const store = createStore(createRootReducer(history), {}, composedEnhancers);
  sagaMiddleware.run(rootSaga);
  return store
};

const store = buildStore(history);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
