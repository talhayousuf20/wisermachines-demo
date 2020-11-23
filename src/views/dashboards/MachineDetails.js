import React from "react";
import classnames from "classnames";

import { CurrentChart, StateChart } from "../../variables/LiveCharts";
import { Meter } from "../../variables/Meter";
import TemperatureCard from "../../variables/TemperatureCard";
import HumidityCard from "../../variables/HumidityCard";
import Info from "../../variables/Info";
import UptimeDowntime from "../../variables/UptimeDowntime";
import DateTime from "../../variables/DateTime";

import { connect } from "react-redux";
import {
  getAllMachines,
  getLast24HDataByMachineID,
  //   requestLiveData,
  //   getLiveData,
} from "../../actions/machinesActions";
import PropTypes from "prop-types";

import { cardStyle } from "../../common/inlineStyles";

import { parseDataFromSSN } from "../../utils/parse";
import { isEmpty } from "../../utils/parse";

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
      loadCurrent: [],
      timeStampStart: null,
      timeStampEnd: null,
      machineState: [],
      utilizationValue: 0,
      utilizationTime: null,
      OEEValue: 0,
      OEETime: null,
      temperature: 25,
      humidity: 30,
      uptime: 0,
      downtime: 0,
      interval: 5000,
      timeStamps: [],
      time: "",
      date: "",
      currentMachineID: "",
      last24HData: [],
      allMachines: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { last24HData } = nextProps;
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

    // requestLiveData(machineID);

    // if (newData) {
    //   const sensor = 0;
    //   const LoadCurrentLive =
    //     newData.data.machines[sensor].machine_load_current;
    //   const machineStateLiveStr = newData.data.machines[sensor].machine_status;
    //   const machineStateLive =
    //     machineStateLiveStr === "OFF"
    //       ? 0
    //       : machineStateLiveStr === "IDLE"
    //       ? 1
    //       : machineStateLiveStr === "ON"
    //       ? 2
    //       : 0;
    //   this.setState({
    //     loadCurrent: [...this.state.loadCurrent, LoadCurrentLive],
    //     machineState: [...this.state.machineState, machineStateLive],
    //   });
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.machine !== prevProps.match.params.machine) {
      //   this.props.getLast24HDataByMachineID(this.props.match.params.machine);
      this.setState({
        loading: true,
        currentMachineID: this.props.match.params.machine,
      });
    }

    // this.props.getLiveData(machineID);
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
    });
  };

  render() {
    const spinner = this.state.loading ? (
      <div className="text-center text-muted">Loading...</div>
    ) : null;

    const { allMachines } = this.state;

    const matchedMachine =
      allMachines.length !== 0
        ? allMachines.filter((machine) => {
            if (machine._id) {
              if (machine._id === this.state.currentMachineID) {
                return machine._id;
              }
            }
          })
        : null;

    const matchedName = matchedMachine
      ? matchedMachine.length !== 0
        ? matchedMachine[0].name
        : "Loading"
      : "Loading";

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
        since={this.state.utilizationSince}
        title={"Utilization"}
        colors={["#ABE5A1"]}
      />
    );

    const OEEMeter = (
      <Meter
        value={this.state.OEEValue}
        since={this.state.OEETime}
        title={"OEE"}
        colors={["#DBA1E5"]}
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

    const dateTimeCard = (
      <DateTime time={this.state.time} date={this.state.date} />
    );

    return (
      <>
        <Header />
        {/* Page content */}
        {spinner}
        <Container className="mt-1">
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
                  <CardBody>{utilizationMeter}</CardBody>
                </Card>

                <Card className="card-stats" style={cardStyle}>
                  <CardBody>{OEEMeter}</CardBody>
                </Card>
              </CardDeck>
            </Col>
          </Row>
          <Row>
            {/* <Col className='mb-5 mb-xl-0' xl='8'> */}
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
            {/*<Col xl='4'>
							<Card className='shadow'>
								<CardHeader className='bg-transparent'>
									<Row className='align-items-center'>
										<div className='col'>
											<h6 className='text-uppercase text-muted ls-1 mb-1'>
												Performance
											</h6>
											<h2 className='mb-0'>
												Total orders
											</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									<div className='chart'>
										<Bar
											data={chartExample2.data}
											options={chartExample2.options}
										/>
									</div>
								</CardBody>
							</Card>
						</Col> */}
          </Row>
          {/* <Row>
						<Col className='mb-5 mb-xl-0' xl='8'>
						<Col className='mb-5'>
							<Card className='bg-shadow' style={cardStyle}>
								<CardHeader className='bg-transparent'>
									<Row className='align-items-center'>
										<div className='col'>
											<h6 className='text-uppercase text-dark ls-1 mb-1'>
												State
											</h6>
											<h2 className='text-gray mb-0'>
												State
											</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									<h6 className='text-uppercase text-dark ls-1 mb-1'>
										State
									</h6>
									<StateChart />
								</CardBody>
							</Card>
						</Col>
					</Row> */}

          {/* <Row className='mt-5'>
						<Col className='mb-5 mb-xl-0' xl='8'>
							<Card className='shadow'>
								<CardHeader className='border-0'>
									<Row className='align-items-center'>
										<div className='col'>
											<h3 className='mb-0'>
												Page visits
											</h3>
										</div>
										<div className='col text-right'>
											<Button
												color='primary'
												href='#pablo'
												onClick={(e) =>
													e.preventDefault()
												}
												size='sm'>
												See all
											</Button>
										</div>
									</Row>
								</CardHeader>
								<Table
									className='align-items-center table-flush'
									responsive>
									<thead className='thead-light'>
										<tr>
											<th scope='col'>Page name</th>
											<th scope='col'>Visitors</th>
											<th scope='col'>Unique users</th>
											<th scope='col'>Bounce rate</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope='row'>/argon/</th>
											<td>4,569</td>
											<td>340</td>
											<td>
												<i className='fas fa-arrow-up text-success mr-3' />{' '}
												46,53%
											</td>
										</tr>
										<tr>
											<th scope='row'>
												/argon/index.html
											</th>
											<td>3,985</td>
											<td>319</td>
											<td>
												<i className='fas fa-arrow-down text-warning mr-3' />{' '}
												46,53%
											</td>
										</tr>
										<tr>
											<th scope='row'>
												/argon/charts.html
											</th>
											<td>3,513</td>
											<td>294</td>
											<td>
												<i className='fas fa-arrow-down text-warning mr-3' />{' '}
												36,49%
											</td>
										</tr>
										<tr>
											<th scope='row'>
												/argon/tables.html
											</th>
											<td>2,050</td>
											<td>147</td>
											<td>
												<i className='fas fa-arrow-up text-success mr-3' />{' '}
												50,87%
											</td>
										</tr>
										<tr>
											<th scope='row'>
												/argon/profile.html
											</th>
											<td>1,795</td>
											<td>190</td>
											<td>
												<i className='fas fa-arrow-down text-danger mr-3' />{' '}
												46,53%
											</td>
										</tr>
									</tbody>
								</Table>
							</Card>
						</Col>
						<Col xl='4'>
							<Card className='shadow'>
								<CardHeader className='border-0'>
									<Row className='align-items-center'>
										<div className='col'>
											<h3 className='mb-0'>
												Social traffic
											</h3>
										</div>
										<div className='col text-right'>
											<Button
												color='primary'
												href='#pablo'
												onClick={(e) =>
													e.preventDefault()
												}
												size='sm'>
												See all
											</Button>
										</div>
									</Row>
								</CardHeader>
								<Table
									className='align-items-center table-flush'
									responsive>
									<thead className='thead-light'>
										<tr>
											<th scope='col'>Referral</th>
											<th scope='col'>Visitors</th>
											<th scope='col' />
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope='row'>Facebook</th>
											<td>1,480</td>
											<td>
												<div className='d-flex align-items-center'>
													<span className='mr-2'>
														60%
													</span>
													<div>
														<Progress
															max='100'
															value='60'
															barClassName='bg-gradient-danger'
														/>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope='row'>Facebook</th>
											<td>5,480</td>
											<td>
												<div className='d-flex align-items-center'>
													<span className='mr-2'>
														70%
													</span>
													<div>
														<Progress
															max='100'
															value='70'
															barClassName='bg-gradient-success'
														/>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope='row'>Google</th>
											<td>4,807</td>
											<td>
												<div className='d-flex align-items-center'>
													<span className='mr-2'>
														80%
													</span>
													<div>
														<Progress
															max='100'
															value='80'
														/>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope='row'>Instagram</th>
											<td>3,678</td>
											<td>
												<div className='d-flex align-items-center'>
													<span className='mr-2'>
														75%
													</span>
													<div>
														<Progress
															max='100'
															value='75'
															barClassName='bg-gradient-info'
														/>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope='row'>twitter</th>
											<td>2,645</td>
											<td>
												<div className='d-flex align-items-center'>
													<span className='mr-2'>
														30%
													</span>
													<div>
														<Progress
															max='100'
															value='30'
															barClassName='bg-gradient-warning'
														/>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</Table>
							</Card>
						</Col>
					</Row> */}
        </Container>
      </>
    );
  }
}

machinesDetails.propTypes = {
  getAllMachines: PropTypes.func.isRequired,
  getLast24HDataByMachineID: PropTypes.func.isRequired,
  //   getLiveData: PropTypes.func.isRequired,
  allMachines: PropTypes.array.isRequired,
  last24HData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allMachines: state.machines.allMachines,
  last24HData: state.machines.last24HData,
  //   newData: state.machines.newData,
});

export default connect(mapStateToProps, {
  getAllMachines,
  getLast24HDataByMachineID,
  //   getLiveData,
})(machinesDetails);
