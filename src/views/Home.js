import React from "react";

import AllMachines from "./dashboards/AllMachines/AllMachines";

import { Container } from "reactstrap";

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
