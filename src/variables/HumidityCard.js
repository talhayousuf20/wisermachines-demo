import React from "react";
import { Container, Row, Col } from "reactstrap";

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
            <i
              className={`text-${iconColor(props.value)} fa fa-tint fa-2x`}
            ></i>

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
