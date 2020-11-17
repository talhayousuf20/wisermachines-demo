import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import axios from "axios";
import { keys_dev } from "./config/keys_dev";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machineNames: [],
      machineIDs: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${keys_dev.SERVER}/machines`)
      .then((res) => {
        if (res.data) {
          const machineNames = res.data.map((machine) => machine.name);
          const machineIDs = res.data.map((machine) => machine._id);
          this.setState({ machineNames: machineNames, machineIDs: machineIDs });
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/admin"
            render={(props) => (
              <AdminLayout {...props} allMachines={this.state} />
            )}
          />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/admin/home" />
        </Switch>
      </BrowserRouter>
    );
  }
}
