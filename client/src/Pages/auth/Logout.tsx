import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export default function Logout() {
  return (
    <Container>
      <Row className="h-100-minus align-items-center">
        <Col>
          <h1>
            Que lástima verte partir{" "}
            <span role="img" aria-label="sad">
              😢
            </span>
          </h1>
          <p>¡Ojalá podamos volverte a ver!</p>
        </Col>
      </Row>
    </Container>
  );
}
