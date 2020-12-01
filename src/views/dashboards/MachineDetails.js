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

import { parseDataFromSSN } from "../../utils/parse";
import { isEmpty } from "../../utils/parse";

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

class machinesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      timeFrameNav: 1,
      loadCurrent: [],
      timeStampStart: null,
      timeStampEnd: null,
      machineState: [],
      utilizationValue: 0,
      utilizationTime: null,
      OEEValue: 0,
      OEETime: null,
      temperature: 0,
      humidity: 0,
      uptime: 0,
      downtime: 0,
      interval: 5000,
      timeStamps: [],
      time: "",
      date: "",
      last24HData: [],
      currentMachineID: "",
      allMachines: [],
      loading: true,
      operationCount: 0,
      unitsConsumed: 0,
      error: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { last24HData, error } = nextProps;

    if (error) {
      return {
        error,
      };
    }

    if (nextProps.last24HData !== prevState.last24HData) {
      if (!isEmpty(last24HData)) {
        const parsed = parseDataFromSSN(last24HData);
        return {
          last24HData: last24HData,
          loadCurrent: parsed.loadCurrent,
          timeStampStart: parsed.timeStampStart,
          timeStampEnd: parsed.timeStampEnd,
          machineState: parsed.machineState,
          interval: parsed.interval,
          timeStamps: parsed.timeStamps,
          temperature: parsed.temperatureNow,
          humidity: parsed.humidityNow,
          utilizationValue: parsed.utilization,
          uptime: parsed.uptime,
          downtime: parsed.downtime,
          date: parsed.date,
          time: parsed.time,
          operationCount: parsed.operationCount,
          unitsConsumed: parsed.unitsConsumed,
          error: null,
          allMachines: nextProps.allMachines,
        };
      } else return null;
    } else
      return {
        allMachines: nextProps.allMachines,
      };
  }

  async componentDidMount() {
    this.setState({
      currentMachineID: this.props.match.params.machine,
    });

    this.props.getAllMachines();
    this.props.getLast24HDataByMachineID(this.props.match.params.machine);
    setInterval(() => {
      this.props.getLast24HDataByMachineID(this.state.currentMachineID);
      this.setState({
        loading: false,
      });
    }, 5000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.machine !== prevProps.match.params.machine) {
      this.setState({
        loading: true,
        currentMachineID: this.props.match.params.machine,
        loadCurrent: [],
        timeStampStart: null,
        timeStampEnd: null,
        machineState: [],
        utilizationValue: 0,
        utilizationTime: null,
        OEEValue: 0,
        OEETime: null,
        temperature: 0,
        humidity: 0,
        uptime: 0,
        downtime: 0,
        interval: 5000,
        timeStamps: [],
        last24HData: [],
        operationCount: 0,
        unitsConsumed: 0,
        error: null,
      });
    }
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
    });
  };

  toggleTimeFrameNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      timeFrameNav: index,
    });
  };

  render() {
    const { allMachines } = this.state;

    const matchedMachine =
      allMachines instanceof Array && allMachines.length !== 0
        ? allMachines.filter((machine) => {
            if (machine._id) {
              if (machine._id === this.state.currentMachineID) {
                return machine._id;
              }
            }
            return null;
          })
        : null;

    const matchedName = matchedMachine
      ? matchedMachine.length !== 0
        ? matchedMachine[0].name
        : "Loading..."
      : "Loading...";

    const liveChartContainer =
      this.state.activeNav === 1 ? (
        <CardBody>
          <CurrentChart chartData={this.state} />
        </CardBody>
      ) : (
        <CardBody>
          <StateChart chartData={this.state} />
        </CardBody>
      );

    const utilizationMeter = (
      <Meter
        value={this.state.utilizationValue}
        since={"in last hour"}
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
        color={"blue"}
      />
    );

    const temperatureCard = (
      <TemperatureCard value={this.state.temperature} unit={"\u00B0Celcius"} />
    );

    const humidityCard = (
      <HumidityCard value={this.state.humidity} unit={"%RH"} />
    );

    const uptimeCard = (
      <UptimeDowntime
        value={this.state.uptime}
        title={"Uptime"}
        unit={"minutes in last hour"}
      />
    );

    const downtimeCard = (
      <UptimeDowntime
        value={this.state.downtime}
        title={"Downtime"}
        unit={"minutes in last hour"}
      />
    );

    const unitsConsumed = (
      <Number
        value={this.state.unitsConsumed}
        icon={"fas fa-bolt fa-2x"}
        title={"Units Consumed"}
        unit={"in last hour"}
      />
    );

    const operationCount = (
      <Number
        value={this.state.operationCount}
        icon={"fas fa-tasks fa-2x"}
        title={"Operation Count"}
        unit={"in last hour"}
      />
    );

    const dateTimeCard = (
      <DateTime time={this.state.time} date={this.state.date} />
    );

    const content = (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt-1">
          {/* <Row>
            <div className="col mb-2">
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
          </Row>*/}
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
    const loader = this.state.loading ? (
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
  error: state.errors.error,
});

export default connect(mapStateToProps, {
  getAllMachines,
  getLast24HDataByMachineID,
})(machinesDetails);
