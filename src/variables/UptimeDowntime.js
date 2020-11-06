import React from "react";
import { Row, Col } from "reactstrap";

import { cardStyle } from "../common/inlineStyles";

const UptimeDowntime = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <span className="h2 font-weight-bold mb-0">Down Time</span>
          <p className="mt-0 mb-0">
            <span className="text-nowrap">{"50"}</span>
          </p>
        </Col>
        <Col className="col-auto">
          <div className="mt-1">
            <div className="icon icon-shape bg-success text-white rounded-circle shadow">
              <i class="fas fa-arrow-down"></i>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UptimeDowntime;
