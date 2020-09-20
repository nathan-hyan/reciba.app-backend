import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <Container>
      <Row className="h-100-minus align-items-center">
        <Col>
          <h1>
            Basta de usar papel para tus comprobantes
            <span role="img" aria-label="Page">
              📃
            </span>
          </h1>

          <p className="lead">
            ¡Ahora podés hacer todo digital! Creá, guardá, enviá comprobantes
            desde tu casa sin necesidad de contacto físico.
          </p>

          <Link to="/invoice/generate">
            <Button>
              <FontAwesomeIcon icon={faLink} /> Comenzá ahora
            </Button>
          </Link>
        </Col>

        <Col className="text-right">
          <h3>...</h3>
        </Col>
      </Row>
    </Container>
  );
}
