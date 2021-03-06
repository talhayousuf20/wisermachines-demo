import React from "react";
import { Row, Col, Container } from "reactstrap";

const Info = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <span className={`text-${props.color} mr-3`}>
              <i className={props.icon} />
            </span>
            <span className="h2">{props.title}</span>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>{props.fields[0]}</strong>
            <p>{props.values[0]}</p>
          </Col>
          <Col>
            <strong>{props.fields[1]}</strong>
            <p>{props.values[1]}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Info;
