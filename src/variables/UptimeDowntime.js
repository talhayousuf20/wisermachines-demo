import React from "react";
import { Row, Col, Container } from "reactstrap";

const iconColor = (value) => {};

const upOrDown = (title) => {
  if (title.includes("up") || title.includes("Up")) {
    return "fa fa-arrow-up";
  }
  if (title.includes("down") || title.includes("Down")) {
    return "fas fa-arrow-down";
  }
};

const UptimeDowntime = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center">
            <span className="h3 font-weight-bold mb-0">{props.title}</span>
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
              className={`text-${iconColor(props.title)} ${upOrDown(
                props.title
              )} fa-2x`}
            ></i>

            <span className="mr-4"></span>
            <span className={`text-${iconColor(props.title)}`}>
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
              <span className={`text-${iconColor(props.title)}`}>
                <span className="ml-1">{props.unit}</span>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UptimeDowntime;
