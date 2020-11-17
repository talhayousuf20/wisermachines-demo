import React from "react";

import MachineSummaryCard from "./MachineSummaryCard";

import { flexContainerStyle } from "../../../common/inlineStyles";
import { keys_dev } from "../../../config/keys_dev";
import axios from "axios";

import { Container } from "reactstrap";

class AllMachines extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { machineNames } = this.props.machines;
    const { machineIDs } = this.props.machines;

    const machinesTiles = machineNames.map((machine) => {
      return (
        <MachineSummaryCard
          machineName={machine}
          machineID={machineIDs[machineNames.indexOf(machine)]}
        ></MachineSummaryCard>
      );
    });

    return (
      <>
        {/* Page content */}
        <Container className="mt--3" fluid>
          <h2 className="text-center m-5 text-muted">Your Machines</h2>
          <div className="flex-container" style={flexContainerStyle}>
            {machinesTiles}
          </div>
        </Container>
      </>
    );
  }
}

export default AllMachines;
