import React from "react";
import classnames from "classnames";

import { CurrentChart, StateChart } from "../../variables/LiveCharts";
import { Meter } from "../../variables/Meter";
import TemperatureCard from "../../variables/TemperatureCard";
import Number from "../../variables/Number";
import HumidityCard from "../../variables/HumidityCard";
import Info from "../../variables/Info";
import UptimeDowntime from "../../variables/UptimeDowntime";
import DateTime from "../../variables/DateTime";

import { connect } from "react-redux";
import {
  getAllMachines,
  getLast24HDataByMachineID,
} from "../../actions/machinesActions";

import PropTypes from "prop-types";

import { cardStyle } from "../../common/inlineStyles";

import { parseDataFromSSN, isEmpty } from "../../utils/parse";
import Loader from "react-loader-spinner";

import {
  Card,
  CardHeader,
  CardBody,
  CardDeck,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";

import { keys_dev } from "../../config/keys_dev";

import io from "socket.io-client";
const client = io(keys_dev.SERVER, {
  transports: ["websocket"],
});

class machinesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      timeFrameNav: 1,
      currentMachineID: "",
      error: null,
      liveData: {},
    };
  }

  async componentDidMount() {
    const { machine } = this.props.match.params;

    this.setState({
      ...this.state,
      currentMachineID: machine,
    });

    this.props.getAllMachines();
    this.props.getLast24HDataByMachineID(machine);

    client.emit("send-data-demo-machine", { _id: machine });
    client.on(`data-demo-machine-${machine}`, (msg) => {
      try {
        if (msg) {
          this.setState({
            ...this.setState,
            liveData: msg,
          });
        } else {
          this.setState({
            ...this.setState,
            liveData: {},
          });
        }
      } catch (error) {
        this.setState({
          ...this.setState,
          liveData: {},
        });
        console.log(error);
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.machine !== prevProps.match.params.machine) {
      window.location.href =
        "/admin/dashboard/" + this.props.match.params.machine;
    }
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      activeNav: index,
    });
  };

  toggleTimeFrameNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      timeFrameNav: index,
    });
  };

  render() {
    const { last24HData } = this.props;
    const { liveData } = this.state;

    const allData = isEmpty(last24HData)
      ? []
      : isEmpty(liveData)
      ? last24HData
      : [...last24HData, liveData];

    const parsed = parseDataFromSSN(allData, this.state.timeFrameNav);

    const { allMachines } = this.props;

    const matchedMachine =
      allMachines instanceof Array && allMachines[0]
        ? allMachines.filter((machine) => {
            if (machine) {
              if (machine._id) {
                if (machine._id === this.state.currentMachineID) {
                  return machine._id;
                }
              }
            }
            return null;
          })
        : null;

    const matchedName = matchedMachine
      ? matchedMachine[0]
        ? matchedMachine[0].name
        : "Loading..."
      : "Loading...";

    const liveChartContainer =
      this.state.activeNav === 1 ? (
        <CardBody>
          <CurrentChart chartData={parsed} />
        </CardBody>
      ) : (
        <CardBody>
          <StateChart chartData={parsed} />
        </CardBody>
      );

    const utilizationMeter = (
      <Meter
        value={parsed.utilization}
        title={"Utilization"}
        colors={["#ABE5A1"]}
      />
    );

    const machineInfo = (
      <Info
        title={"Machine"}
        fields={["Name"]}
        values={[`${matchedName}`]}
        icon={"fas fa-cogs"}
        liveData={isEmpty(liveData) ? false : true}
        color={"blue"}
      />
    );

    const temperatureCard = (
      <TemperatureCard value={parsed.temperatureNow} unit={"\u00B0Celcius"} />
    );

    const humidityCard = (
      <HumidityCard value={parsed.humidityNow} unit={"%RH"} />
    );

    const uptimeCard = (
      <UptimeDowntime value={parsed.uptime} title={"Uptime"} unit={"HH:MM"} />
    );

    const downtimeCard = (
      <UptimeDowntime
        value={parsed.downtime}
        title={"Downtime"}
        unit={"HH:MM"}
      />
    );

    const unitsConsumed = (
      <Number
        value={parsed.unitsConsumed}
        icon={"fas fa-bolt fa-2x"}
        title={"Units Consumed"}
        unit={"kilowatt hour"}
      />
    );

    const operationCount = (
      <Number
        value={parsed.operationCount}
        icon={"fas fa-tasks fa-2x"}
        title={"Operation Count"}
        unit={""}
      />
    );

    const dateTimeCard = <DateTime time={parsed.time} date={parsed.date} />;

    const content = (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt-1">
          <Row>
            <div className="col mb-3">
              <Nav className="justify-content-end" pills>
                <NavItem>
                  <NavLink
                    className={classnames("py-2 px-3", {
                      active: this.state.timeFrameNav === 1,
                    })}
                    href="#pablo"
                    onClick={(e) => this.toggleTimeFrameNavs(e, 1)}
                  >
                    <span className="d-none d-md-block">Hour</span>
                    <span className="d-md-none">H</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames("py-2 px-3", {
                      active: this.state.timeFrameNav === 2,
                    })}
                    data-toggle="tab"
                    href="#pablo"
                    onClick={(e) => this.toggleTimeFrameNavs(e, 2)}
                  >
                    <span className="d-none d-md-block">Day</span>
                    <span className="d-md-none">D</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames("py-2 px-3", {
                      active: this.state.timeFrameNav === 3,
                    })}
                    data-toggle="tab"
                    href="#pablo"
                    onClick={(e) => this.toggleTimeFrameNavs(e, 3)}
                  >
                    <span className="d-none d-md-block">Week</span>
                    <span className="d-md-none">Week</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Row>
          <Row>
            <Col className="mb-3">
              <CardDeck style={{ display: "flex" }}>
                <Card className="card-stats" style={cardStyle}>
                  <CardBody>{machineInfo}</CardBody>
                </Card>

                <Card className="card-stats" style={cardStyle}>
                  <CardBody>{dateTimeCard}</CardBody>
                </Card>
              </CardDeck>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <CardDeck style={{ display: "flex" }}>
                <Card className="card-stats" style={cardStyle}>
                  <CardBody>{temperatureCard}</CardBody>
                  <CardBody>{humidityCard}</CardBody>
                </Card>

                <Card className="card-stats" style={cardStyle}>
                  <CardBody>{uptimeCard}</CardBody>
                  <CardBody>{downtimeCard}</CardBody>
                </Card>

                <Card className="card-stats" style={cardStyle}>
                  <CardBody>{unitsConsumed}</CardBody>
                  <CardBody>{operationCount}</CardBody>
                </Card>

                <Card className="card-stats" style={cardStyle}>
                  <CardBody>{utilizationMeter}</CardBody>
                </Card>
              </CardDeck>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <Card className="bg-shadow" style={cardStyle}>
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">
                              Load Current (A)
                            </span>
                            <span className="d-md-none">P</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">
                              Machine State
                            </span>
                            <span className="d-md-none">I</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                {liveChartContainer}
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
    const loader = this.props.loading ? (
      <div className="text-center mb-5">
        <Loader type="ThreeDots" color="#00b386" height={50} />
      </div>
    ) : null;

    return (
      <div>
        {loader}
        {content}
      </div>
    );
  }
}

machinesDetails.propTypes = {
  getAllMachines: PropTypes.func.isRequired,
  getLast24HDataByMachineID: PropTypes.func.isRequired,
  allMachines: PropTypes.array.isRequired,
  last24HData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allMachines: state.machines.allMachines,
  last24HData: state.machines.last24HData,
  loading: state.machines.loading,
  error: state.errors.error,
});

export default connect(mapStateToProps, {
  getAllMachines,
  getLast24HDataByMachineID,
})(machinesDetails);
