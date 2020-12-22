import React from "react";
import { Row, Col, Container } from "reactstrap";
import Loader from "react-loader-spinner";

const Info = (props) => {
  const animation = props.liveData ? (
    <Loader
      type="Bars"
      color="#525F7F"
      height={20}
      style={{ marginLeft: -28 }}
    />
  ) : null;

  const liveData = props.liveData ? <p>Recieving real-time updates</p> : null;

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
            {animation}
            {liveData}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Info;
