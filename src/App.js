import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import { Provider } from "react-redux";
import store from "./store";

import { keys_dev } from "./config/keys_dev";

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
            <Redirect from="/" to={`/admin/dashboard/${keys_dev.KOLSON}`} />
            <Redirect
              from="/admin/dashboard/:machine"
              to={`/admin/dashboard/${keys_dev.KOLSON}`}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
