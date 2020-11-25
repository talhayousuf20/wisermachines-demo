import React from "react";
import { Container, Row, Col } from "reactstrap";

const Number = (props) => {
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
            <i className={props.icon}></i>
            <span className="mr-4"></span>

            <span style={{ fontSize: "300%" }}>{props.value}</span>
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
              <span className="ml-1">{props.unit}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Number;
