import React from "react";

import AllMachines from "./dashboards/AllMachines/AllMachines";

import { Container } from "reactstrap";

import axios from "axios";
import { keys_dev } from "../config/keys_dev";

class Home extends React.Component {
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
    const machines = this.state;
    return (
      <div>
        <Container className="mt-7">
          <AllMachines machines={this.state} />
        </Container>
      </div>
    );
  }
}

export default Home;
