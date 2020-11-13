import React from "react";
import classnames from "classnames";

import AllMachines from "./dashboards/AllMachines/AllMachines";
import Header from "components/Headers/Header.js";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardDeck,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container className="mt-7">
          <AllMachines />
        </Container>
      </div>
    );
  }
}

export default Home;
