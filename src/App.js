import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import store from "./store";

import { connectToWebSocketServer } from "./actions/ssnDataActions.js";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/admin/index" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
