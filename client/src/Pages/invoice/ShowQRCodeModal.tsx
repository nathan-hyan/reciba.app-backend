import React, { useContext, useEffect } from "react";
import QRCode from "qrcode.react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import "./QRCode.css";
import { IdGeneration } from "../../Context/IdGeneration";

export default function ShowQRCodeModal({
  show = true,
  onHide = () => (show = !show),
}: {
  show: boolean;
  onHide: () => void;
}) {
  const { generateId, currentId } = useContext(IdGeneration);

  useEffect(() => {
    generateId();
    console.log(currentId);
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
            <QRCode
              size={200}
              value={`https://billsapp.herokuapp.com/signature/${currentId}`}
            />
          </Col>
          <Col />
        </Row>
        <Row>
          <Col className="text-center">
            <p className="lead">
              Al finalizar la firma, presionar para continuar
            </p>
            <Button onClick={onHide}>Cerrar</Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
