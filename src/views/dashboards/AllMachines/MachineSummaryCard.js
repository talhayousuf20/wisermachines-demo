import React, { Component } from 'react';

import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';

import { cardStyle } from '../../../common/inlineStyles';

export default class MachineSummaryCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [70],
			options: {
				chart: {
					type: 'radialBar',
				},
				plotOptions: {
					radialBar: {
						hollow: {
							size: '70%',
						},
					},
				},
				labels: ['Test'],
			},
		};
	}
	render() {
		return (
			<div>
				<Card className='card-stats m-2' style={cardStyle}>
					<CardBody>
						<Row>
							<div className='col'>
								<CardTitle
									tag='h5'
									className='text-uppercase text-muted mb-0'>
									Traffic
								</CardTitle>
								<span className='h2 font-weight-bold mb-0'>
									350,897
								</span>
							</div>
							<Col className='col-auto'>
								<div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
									<i className='fas fa-chart-bar' />
								</div>
							</Col>
						</Row>
						<p className='mt-3 mb-0 text-muted text-sm'>
							<span className='text-success mr-2'>
								<i className='fa fa-arrow-up' />{' '}
								{this.props.testProp}
							</span>
							<span className='text-nowrap'>
								Since last month
							</span>
						</p>
					</CardBody>
					<CardBody>
						<Chart
							options={this.state.options}
							series={this.state.series}
							type='radialBar'
							height={200}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}
}
