import React from "react";
import { Row, Container } from "reactstrap";

const DateTime = (props) => {
  return (
    <div className="container m-3">
      <Container>
        <Row>
          <div
            className="ml-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className={`text-green mr-3`}>
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </span>

            <span style={{ fontSize: "150%" }}>{props.time}</span>
          </div>
        </Row>
        <br />
        <Row>
          <div
            className="ml-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className={`text-green mr-3`}>
              <i className="fa fa-clock" aria-hidden="true"></i>
            </span>

            <span style={{ fontSize: "150%" }}>{props.date}</span>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DateTime;
