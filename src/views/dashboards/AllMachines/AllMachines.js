import React from 'react';
import classnames from 'classnames';

import Header from '../../../components/Headers/Header';
import MachineSummaryCard from './MachineSummaryCard';

import { flexContainerStyle } from '../../../common/inlineStyles';

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	NavItem,
	NavLink,
	Nav,
	Progress,
	Table,
	Container,
	Row,
	Col,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AllMachines extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const numberOfMachines = 15; 

		const allCards = [];

		for (let i = 0; i < numberOfMachines; i++) {
			allCards.push(<MachineSummaryCard testProp={i}/>);
		}

		return (
			<>
				<Header hideHeaderCards={true} />
				{/* Page content */}
				<Container className='mt--7' fluid>
					<div class='flex-container' style={flexContainerStyle}>
						{allCards}
					</div>
				</Container>
			</>
		);
	}
}

export default connect(null, {})(AllMachines);
