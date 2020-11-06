import React from "react";
import { Row, Col, Container } from "reactstrap";

import { cardStyle } from "../common/inlineStyles";

const InfoCard = (props) => {
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
            <div>
              <strong>{props.fields[0]}</strong>
              <p>{props.values[0]}</p>
            </div>

            <div>
              <strong>{props.fields[1]}</strong>
              <p>{props.values[1]}</p>
            </div>

            <div>
              <strong>{props.fields[2]}</strong>
              <p>{props.values[2]}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InfoCard;
