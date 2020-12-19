import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  NavbarBrand,
  Container,
  Media,
} from "reactstrap";

import { connect } from "react-redux";
import { getAllMachines } from "../../actions/machinesActions";
import PropTypes from "prop-types";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    localStorage.setItem("unlocked", false);
  }

  async componentDidMount() {
    this.props.getAllMachines();
  }

  render() {
    const { allMachines } = this.props;
    let machinesMenu = (
      <DropdownItem>
        <i className="ni ni-settings-gear-65" />
        <span>Loading...</span>
      </DropdownItem>
    );
    if (allMachines && allMachines.length !== 0) {
      const machineNames = allMachines.map((machine) => machine.name);
      const machineIDs = allMachines.map((machine) => machine._id);
      machinesMenu = machineNames.map((machine) => {
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
    }

    return (
      <>
        <Navbar
          className="navbar-top navbar-light bg-transparent"
          expand="sm"
          id="navbar-main"
        >
          <Container fluid>
            <NavbarBrand className="pt-2" href="/">
              <Media className="align-items-center">
                <div>
                  <img
                    className="navbar-brand-img"
                    src={require("../../assets/img/brand/logo.png")}
                    width="100px"
                    alt="wisermachines"
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

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <i className="fas fa-th"></i>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Machines
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
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

AdminNavbar.propTypes = {
  getAllMachines: PropTypes.func.isRequired,
  allMachines: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allMachines: state.machines.allMachines,
  error: state.errors.error,
});

export default connect(mapStateToProps, { getAllMachines })(AdminNavbar);
