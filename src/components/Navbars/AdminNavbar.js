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
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  NavbarBrand,
  Container,
  Media,
} from "reactstrap";

import { navbarStyle } from "../../common/inlineStyles";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    localStorage.setItem("unlocked", false);
  }

  render() {
    const { machineNames } = this.props.allMachines;
    const { machineIDs } = this.props.allMachines;
    const machinesMenu = machineNames.map((machine) => {
      return (
        <DropdownItem
          to={`/admin/dashboard/${machineIDs[machineNames.indexOf(machine)]}`}
          tag={Link}
          key={machineIDs[machineNames.indexOf(machine)]}
        >
          <i className="ni ni-settings-gear-65" />
          <span>{machine}</span>
        </DropdownItem>
      );
    });

    return (
      <>
        <Navbar
          className="navbar-top navbar-light bg-transparent"
          expand="sm"
          id="navbar-main"
          // style={navbarStyle}
        >
          <Container fluid>
            <NavbarBrand className="pt-2" href="/">
              <Media className="align-items-center">
                <div>
                  <img
                    className="navbar-brand-img"
                    src={require("../../assets/img/brand/logo.png")}
                    width="100px"
                  />
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "60%",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                  >
                    WiserMachines
                  </div>
                </div>
              </Media>
            </NavbarBrand>
            {/* <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link> */}
            {/* <Form className="navbar-search navbar-search-light form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form>
            <Media className="align-items-center">
              <span>
                <i className="fas fa-bell"></i>
              </span>
            </Media> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    {/* <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span> */}
                    <i className="fas fa-th"></i>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Machines
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  {/* <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem> */}
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem> */}
                  {machinesMenu}
                  <DropdownItem divider />
                  <DropdownItem href="/" onClick={this.onClick}>
                    <i className="fas fa-lock"></i>
                    <span>Lock</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
          <hr />
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
