import React from "react";

import MachineSummaryCard from "./MachineSummaryCard";

import { flexContainerStyle } from "../../../common/inlineStyles";

import { Container } from "reactstrap";

import { connect } from "react-redux";
import { getAllMachines } from "../../../actions/machinesActions";
import PropTypes from "prop-types";

class AllMachines extends React.Component {
  async componentDidMount() {
    this.props.getAllMachines();
  }

  render() {
    const { allMachines } = this.props;
    let machinesButtons = (
      <h4 className="text-center m-5 text-muted">Loading...</h4>
    );
    if (allMachines && allMachines.length !== 0) {
      const machineNames = allMachines.map((machine) => machine.name);
      const machineIDs = allMachines.map((machine) => machine._id);
      machinesButtons = machineNames.map((machine) => {
        return (
          <MachineSummaryCard
            machineName={machine}
            machineID={machineIDs[machineNames.indexOf(machine)]}
          ></MachineSummaryCard>
        );
      });
    }
    return (
      <>
        <Container className="mt--3" fluid>
          <h2 className="text-center m-5 text-muted">Your Machines</h2>
          <div className="flex-container" style={flexContainerStyle}>
            {machinesButtons}
          </div>
        </Container>
      </>
    );
  }
}

AllMachines.propTypes = {
  getAllMachines: PropTypes.func.isRequired,
  allMachines: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allMachines: state.machines.allMachines,
  error: state.errors.error,
});

export default connect(mapStateToProps, { getAllMachines })(AllMachines);
