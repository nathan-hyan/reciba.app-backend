import {
  faEnvelope,
  faFileDownload,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Button } from "react-bootstrap";

export default function ButtonsGroup({
  exportPDFToFile,
  transformPDFToBase64,
  toggleEmailInput,
  hasSocketId,
}: {
  exportPDFToFile: () => void;
  transformPDFToBase64: () => void;
  toggleEmailInput: () => void;
  hasSocketId?: boolean;
}) {
  return (
    <Col className="p-3 bg-light text-center shadow rounded">
      <Button className="mx-2" onClick={exportPDFToFile}>
        <FontAwesomeIcon icon={faFileDownload} /> Descargar PDF
      </Button>
      <Button
        disabled={hasSocketId}
        className="mx-2"
        onClick={transformPDFToBase64}
      >
        <FontAwesomeIcon icon={faPhone} /> Enviar PDF al Teléfono
      </Button>
      <Button onClick={toggleEmailInput} className="mx-2">
        <FontAwesomeIcon icon={faEnvelope} /> Enviar copia por email
      </Button>
    </Col>
  );
}
