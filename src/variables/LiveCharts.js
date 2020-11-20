import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useEffect, useState } from "react";

const dateTimeLabelFormats = {
  second: "%l:%M:%S %P",
  minute: "%l:%M %P",
  hour: "%l %P",
  day: "%e. %b",
  week: "%e. %b",
  month: "%b '%y",
  year: "%Y",
};

const commonOptions = {
  chart: {
    height: "30%",
    marginRight: 0,
    renderTo: "container",
    zoomType: "x",
    events: {
      load: () => {},
    },
  },
  time: {
    useUTC: false,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats,
    gridLineWidth: 0,
    lineWidth: 0,
    minorGridLineWidth: 0,
    tickColor: "rgb(0,0,0,0)",
  },

  scrollbar: {
    barBackgroundColor: "rgb(0,0,0,0.3)",
    barBorderColor: "rgb(0,0,0,0)",
    buttonArrowColor: "rgb(0,0,0,0)",
    buttonBackgroundColor: "rgb(0,0,0,0)",
    buttonBorderColor: "rgb(0,0,0,0)",
    rifleColor: "rgb(0,0,0,0)",
    trackBackgroundColor: "rgb(0,0,0,0)",
    trackBorderColor: "rgb(0,0,0,0)",
  },
  navigator: {
    handles: {
      backgroundColor: "rgb(0,0,0,0)",
      borderColor: "rgb(0,0,0,0)",
    },
    outlineColor: "rgba(0,0,0,0.1)",
    maskFill: "rgba(0,0,0,0.2)",

    xAxis: {
      gridLineWidth: 0,
      dateTimeLabelFormats,
    },
  },

  rangeSelector: {
    verticalAlign: "bottom",
    x: 0,
    y: 0,

    allButtonsEnabled: true,

    buttons: [
      {
        type: "day",
        count: 1,
        text: "1 Day",
      },
      {
        type: "hour",
        count: 1,
        text: "1 Hour",
      },
      {
        type: "minute",
        count: 5,
        text: "5 Min",
      },
      {
        type: "all",
        text: "All",
      },
    ],
    selected: 2,
    buttonTheme: {
      width: 50,
    },
  },
};

export const CurrentChart = (props) => {
  const [chartOptions, setChartOptions] = useState(commonOptions);

  useEffect(() => {
    const { loadCurrent, timeStamps } = props.chartData;

    setChartOptions({
      yAxis: [
        {
          // offset: -20,
          min: 0,
          max: Math.max(...loadCurrent),
        },
      ],
      series: [
        {
          data: (function () {
            let time = timeStamps;
            let series = loadCurrent;
            let i;
            let data = [];

            for (i = 0; i < time.length; ++i) {
              data.push([time[i], series[i]]);
            }
            return data;
          })(),
          name: "Current",
          type: "areaspline",
          tooltip: {
            valueDecimals: 2,
          },
          color: Highcharts.getOptions().colors[2],
          fillColor: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[2]],
              [
                0.6,
                Highcharts.color(Highcharts.getOptions().colors[2])
                  .setOpacity(0.1)
                  .get("rgba"),
              ],
            ],
          },
          threshold: null,
        },
      ],
    });
  }, [props]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};

export const StateChart = (props) => {
  const [chartOptions, setChartOptions] = useState(commonOptions);

  useEffect(() => {
    const { machineState, timeStamps } = props.chartData;
    setChartOptions({
      yAxis: [
        {
          // offset: -20,
          min: 0,
          max: Math.max(...machineState),
        },
      ],
      series: [
        {
          data: (function () {
            let time = timeStamps;
            let series = machineState;
            let i;
            let data = [];

            for (i = 0; i < time.length; ++i) {
              data.push([time[i], series[i]]);
            }
            return data;
          })(),
          name: "State",
          step: "center",
          type: "areaspline",
          tooltip: {
            valueDecimals: 0,
          },
          color: Highcharts.getOptions().colors[0],
          fillColor: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [
                0.6,
                Highcharts.color(Highcharts.getOptions().colors[0])
                  .setOpacity(0.1)
                  .get("rgba"),
              ],
            ],
          },
          threshold: null,
        },
      ],
    });
  }, [props]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};
