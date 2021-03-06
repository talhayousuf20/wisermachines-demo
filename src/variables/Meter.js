import React from "react";
import { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";

const colors = (props) => {
  if (props.colors) {
    return props.colors;
  } else return ["#ABE5A1"];
};

const options = (props) => {
  return {
    chart: {
      type: "radialBar",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: colors(props),
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#EFEFEF",
          strokeWidth: "100%",
          margin: 0,
        },

        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            fontSize: "300%",
            fontWeight: "",
            show: true,
            textAnchor: "middle",
          },
        },
      },
    },
    labels: ["Percent"],
  };
};

export const Meter = (props) => {
  const [optionsState] = useState(options(props));
  const [variables, setVariables] = useState({
    series: [0],
    since: null,
  });

  useEffect(() => {
    setVariables({
      series: [props.value],
      since: props.since,
    });
  }, [props]);

  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center">
            <span className="h3 font-weight-bold mb-0">{props.title}</span>
          </Col>
        </Row>

        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Chart
                options={optionsState}
                series={variables.series}
                type="radialBar"
                height={250}
                width={"120%"}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col text-center">
            <p className="mt-0 mb-0">
              <span className="text-nowrap">{variables.since}</span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
