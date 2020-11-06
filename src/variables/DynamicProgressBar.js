import React, { useState, useRef, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartMore from 'highcharts/highcharts-more';

HighchartMore(Highcharts);

const barColor = (state) => {
	if (state === 'ON') return '#F5365C';
	if (state === 'OFF') return '#5E72E4';
	if (state === 'IDLE') return '#212529';
};

const chartData = [
	{
		data: [
			{
				name: 'ON',
				start: Date.UTC(2020, 8, 21, 9, 44, 0),
				end: Date.UTC(2020, 9, 21, 9, 45, 0),
				y: 0,
				color: barColor('ON'),
			},
			{
				name: 'OFF',
				start: Date.UTC(2020, 9, 21, 9, 45, 0),
				end: Date.UTC(2020, 10, 21, 9, 46, 0),
				y: 0,
				color: barColor('OFF'),
			},
			{
				name: 'IDLE',
				start: Date.UTC(2020, 11, 21, 9, 46, 0),
				end: Date.UTC(2020, 12, 21, 9, 47, 0),
				y: 0,
				color: barColor('IDLE'),
			},
			{
				name: 'ON',
				start: Date.UTC(2020, 10, 21, 9, 47, 0),
				end: Date.UTC(2020, 11, 21, 9, 49, 0),
				y: 0,
				color: barColor('ON'),
			},
			{
				name: 'OFF',
				start: Date.UTC(2020, 12, 21, 9, 47, 0),
				end: Date.UTC(2020, 13, 21, 9, 49, 0),
				y: 0,
				color: barColor('OFF'),
			},
			{
				name: 'IDLE',
				start: Date.UTC(2020, 13, 21, 9, 47, 0),
				end: Date.UTC(2020, 14, 21, 9, 49, 0),
				y: 0,
				color: barColor('IDLE'),
			},
			{
				name: 'ON',
				start: Date.UTC(2020, 14, 21, 9, 47, 0),
				end: Date.UTC(2020, 15, 21, 9, 49, 0),
				y: 0,
				color: barColor('ON'),
			},
			{
				name: 'IDLE',
				start: Date.UTC(2020, 15, 21, 9, 47, 0),
				end: Date.UTC(2020, 16, 21, 9, 49, 0),
				y: 0,
				color: barColor('IDLE'),
			},
		],
	},
];

export const StateChart = (props) => {
	const chartRef = useRef(null);
	const [chartOptions, setChartOptions] = useState({
		chart: {
			type: 'xrange',
        },
        tooltip: {
            split: false
        },
		navigator: {
			handles: {
				backgroundColor: 'rgb(0,0,0,0)',
				borderColor: 'rgb(0,0,0,0)',
			},
            outlineColor: 'rgba(0,0,0,0)',
			maskFill: 'rgba(0,0,0,0.1)',
			enabled: false,
			liveRedraw: true,
            margin: 5,
		},

		scrollbar: {
			barBackgroundColor: 'rgb(0,0,0,0)',
			barBorderColor: 'rgb(0,0,0,0)',
			buttonArrowColor: 'rgb(0,0,0,0)',
			buttonBackgroundColor: 'rgb(0,0,0,0)',
			buttonBorderColor: 'rgb(0,0,0,0)',
			rifleColor: 'rgb(0,0,0,0)',
			trackBackgroundColor: 'rgb(0,0,0,0)',
			trackBorderColor: 'rgb(0,0,0,0)',
		},

		rangeSelector: {
			enabled: true,
			verticalAlign: 'bottom',
			x: 0,
			y: 0,

			allButtonsEnabled: true,

			buttons: [
				{
					type: 'day',
					count: 1,
					text: '1 Day',
				},
				{
					type: 'hour',
					count: 1,
					text: '1 Hour',
				},
				{
					type: 'minute',
					count: 5,
					text: '5 Min',
				},
				{
					type: 'all',
					text: 'All',
				},
			],
			selected: 3,
			buttonTheme: {
				width: 50,
            },
		},

		yAxis: [
			{
				categories: ['State'],
				grid: {
					enabled: false,
				},
				title: {
					text: null,
				},
				labels: { enabled: false },
			},
		],
		xAxis: [
			{
				visible: false,
				grid: {
					enabled: false,
				},
				minPadding: 0,
				maxPadding: 0,
			},
			{
				visible: false,
				grid: {
					enabled: false,
				},
			},
		],

		credits: {
			enabled: false,
		},

		plotOptions: {
			series: {
				height: '80px',
			},
			xrange: {
				borderRadius: 2,
				borderWidth: 0,
				grouping: false,
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					style: {
						textOutline: '0px',
						fontWeight: 'narrow',
						fontSize: '100%',
					},
				},
			},
		},
		series: chartData,
	});

	useEffect(() => {
		setChartOptions({});
	}, [props]);

	return (
		<div>
			<HighchartsReact
				constructorType='ganttChart'
				highcharts={Highcharts}
				options={chartOptions}
				ref={chartRef}
			/>
		</div>
	);
};
