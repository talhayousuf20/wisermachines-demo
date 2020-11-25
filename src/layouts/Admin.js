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
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import { cardStyle } from "../common/inlineStyles";
import { keys_dev } from "../config/keys_dev";

const pin = keys_dev.PIN;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: "",
      unlocked: false,
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      pin: e.target.value,
    });
  }

  onSubmit() {
    if (this.state.pin === pin) {
      this.setState({
        unlocked: true,
      });
      localStorage.setItem("unlocked", true);
    } else {
      this.setState({
        error: "Wrong PIN",
      });
    }
  }

  // componentDidUpdate(e) {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.mainContent.scrollTop = 0;
  // }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    const unlocked = localStorage.getItem("unlocked") === "true";

    const lockScreen = (
      <div className="main-content">
        <div className="header py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  {/* <h1 className="text-dark">Welcome!</h1> */}
                  <p className="text-lead text-light"></p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card
                className="bg-secondary shadow border-0"
                style={{ cardStyle }}
              >
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="PIN"
                          type="password"
                          autoComplete="new-password"
                          onChange={this.onChange}
                          onKeyPress={(ev) => {
                            console.log(`Pressed keyCode ${ev.key}`);
                            if (ev.key === "Enter") {
                              ev.preventDefault();
                              this.onSubmit();
                            }
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                    {this.state.error ? (
                      <div className="text-danger text-center">
                        {this.state.error}
                      </div>
                    ) : null}
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={this.onSubmit}
                      >
                        Unlock
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );

    const mainContent = (
      <>
        <AdminNavbar
          {...this.props}
          brandText={this.getBrandText(this.props.location.pathname)}
        />
        <div className="main-content" ref="mainContent">
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/home" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );

    return unlocked ? mainContent : lockScreen;
  }
}

export default Admin;
