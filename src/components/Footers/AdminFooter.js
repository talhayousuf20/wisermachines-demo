/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer bg-transparent">
        <Row className="align-items-center justify-content-xl-between">
          <Col>
            <div className="copyright text-center text-xl-left text-muted">
              © 2018{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://www.wisermachines.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                WiserMachines
              </a>
            </div>
          </Col>

          {/* <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  Customer Support
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="" rel="noopener noreferrer" target="_blank">
                  User Guide
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href=""
                  rel="noopener noreferrer"
                  target="_blank"
                ></NavLink>
              </NavItem>
            </Nav>
          </Col> */}
        </Row>
      </footer>
    );
  }
}

export default Footer;
