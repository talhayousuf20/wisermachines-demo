import React, { Component } from "react";
import classnames from "classnames";
import { Nav, NavLink, NavItem, Container } from "reactstrap";

export default class MachineSummaryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { machineName, machineID } = this.props;
    return (
      <div>
        <Container>
          <Nav className="justify-content-end" pills>
            <NavItem className="text-center" style={{ minWidth: "80px" }}>
              <NavLink
                className={classnames("py-2 px-3", {
                  active: true,
                })}
                href={`/admin/dashboard/${machineID}`}
              >
                <span className="d-none d-md-block">{machineName}</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </div>
    );
  }
}
