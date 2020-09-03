import React, { useRef } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import io from "socket.io-client";
const SignaturePad = require("react-signature-pad");
const ENDPOINT =
  process.env.NODE_ENV !== "production"
    ? "http://192.168.100.6:8000"
    : "https://billsapp.herokuapp.com/";
const socket = io.connect(ENDPOINT, {
  transports: ["websocket"],
});

export default function Signature() {
  const signatureRef: any = useRef();
  const { id } = useParams();
  socket.emit("join", id);

  const sendSign = () => {
    console.log("hay shit");
    socket.emit("sign", signatureRef.current.toDataURL());
  };

  return (
    <Container className="h-100-minus mt-5">
      <Row>
        <Col className="text-center">
          <p className="lead m-0">Firme en el campo en blanco para continuar</p>
          <small className="text-muted">
            Coloque el teléfono en modo horizontal para mejor resultado
          </small>
        </Col>
      </Row>
      <Row className="my-5">
        <Col
          onTouchEnd={sendSign}
          onMouseUp={sendSign}
          className="bg-white shadow rounded"
        >
          <SignaturePad ref={signatureRef} />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <Button
            className="w-100"
            variant="danger"
            onClick={() => {
              signatureRef.current.clear();
              sendSign();
            }}
          >
            Reiniciar Firma
          </Button>
        </Col>

        <Col>
          <Button
            className="w-100"
            variant="primary"
            onClick={() => console.log("ey")}
          >
            Aceptar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
