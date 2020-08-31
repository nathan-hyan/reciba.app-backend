import React from "react";
import QRCode from "qrcode.react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import "./QRCode.css";

export default function SignatureCode() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <Container>
      <Row>
        <Col>
          <p className="lead text-center">
            Escanee el código con el celular para continuar
          </p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col />
        <Col className="bg-white shadow rounded p-3" md={3}>
          <QRCode
            size={200}
            value={`https://billsapp.herokuapp.com/signature/${id}`}
          />
        </Col>
        <Col />
      </Row>
      <Row>
        <Col className="text-center">
          <p className="lead">
            Al finalizar la firma, presionar para continuar
          </p>
          <Button onClick={() => history.push(`/invoice/display/${id}`)}>
            Siguiente
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
