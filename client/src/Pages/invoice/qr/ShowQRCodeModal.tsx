import React, { useContext, useEffect } from "react";
import QRCode from "qrcode.react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import "./QRCode.css";
import { IdGeneration } from "../../../Context/IdGeneration";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowQRCodeModal({
  show = true,
  onHide = () => (show = !show),
}: {
  show: boolean;
  onHide: () => void;
}) {
  const ENDPOINT =
    process.env.NODE_ENV !== "production"
      ? "http://192.168.100.6:3000"
      : "https://billsapp.herokuapp.com";
  const { generateId, currentId } = useContext(IdGeneration);

  useEffect(() => {
    generateId();
    //eslint-disable-next-line
  }, []);

  return (
    <Modal size="xl" show={show} onHide={onHide}>
      <Modal.Body>
        <Row>
          <Col>
            <p className="lead text-center">
              Escanee el código con el celular para poder firmar en este
              comprobante
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <Col />
          <Col className="bg-white shadow rounded p-3" md={3}>
            <QRCode size={200} value={`${ENDPOINT}/signature/${currentId}`} />
          </Col>
          <Col />
        </Row>
        <Row>
          <Col className="text-center">
            <p className="lead">
              Al finalizar la firma, presionar para continuar
            </p>
            <Button onClick={onHide}>
              <FontAwesomeIcon icon={faTimesCircle} /> Cerrar
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
