import React from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const iconColor = (value) => {
  if (value <= 30) {
    return "blue";
  } else if (value <= 60) {
    return "orange";
  } else if (value > 60) {
    return "red";
  }
};

const HumidityCard = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center">
            <span className="h3 font-weight-bold mb-0">Humidity</span>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={`icon icon-shape bg-${iconColor(
                props.value
              )} text-white rounded-circle shadow `}
            >
              <i class="fa fa-tint"></i>
            </span>
            <span className="mr-4"></span>
            <span className={`text-${iconColor(props.value)}`}>
              <span style={{ fontSize: "300%" }}>{props.value}</span>
            </span>
          </div>
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
              <span className={`text-${iconColor(props.value)}`}>
                <span className="ml-1">{props.unit}</span>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HumidityCard;
