import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Header from "../../../components/Headers/Header";
import MachineSummaryCard from "./MachineSummaryCard";

import { flexContainerStyle } from "../../../common/inlineStyles";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class AllMachines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const machinesNamesList = ["X-Ray", "MRI"];

    const machinesTiles = machinesNamesList.map((machinesName) => {
      return (
        <MachineSummaryCard
          machineName={machinesName.toUpperCase()}
        ></MachineSummaryCard>
      );
    });

    return (
      <>
        {/* Page content */}
        <Container className="mt--3" fluid>
          <h2 className="text-center m-5 text-muted">Your Machines</h2>
          <div class="flex-container" style={flexContainerStyle}>
            {machinesTiles}
          </div>
        </Container>
      </>
    );
  }
}

export default connect(null, {})(AllMachines);
