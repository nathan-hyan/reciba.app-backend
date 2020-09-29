import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DownloadModal({
  show,
  handleClose,
  PDFFile,
}: {
  show: boolean;
  handleClose: () => void;
  PDFFile: string;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¡Boleta lista!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Su boleta ha sido generada con éxito. ¿Desea descargar una copia?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimesCircle} /> Ignorar
        </Button>
        <a download="Comprobante.pdf" href={PDFFile}>
          <Button>
            <FontAwesomeIcon icon={faDownload} /> Descargar comprobante
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
}
