import React, { useRef, useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
  const { id } = useParams<any>();
  const [PDFFile, setPDFFile] = useState("");

  useEffect(() => {
    socket.emit("join", id);
    socket.emit("close", false);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("pdf", (file: string) => {
      setPDFFile(file);
    });
  });

  const sendSign = () => {
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
      <Row>
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
      </Row>
      <Row className="my-5 text-center">
        <Col>
          <p className="lead">¡No cierre esta página!</p>
          <p>
            Cuando se genere el comprobante, debajo aparecerá un botón para
            descargarlo
          </p>
          <a download="Comprobante.pdf" href={PDFFile}>
            <Button className={PDFFile ? "d-block w-100" : "d-none"}>
              Descargar comprobante
            </Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
}
