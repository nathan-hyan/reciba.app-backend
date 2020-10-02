import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { notify } from "react-notify-toast";

export default function TagsModal({
  show,
  handleClose,
  invoiceId,
  prevTags,
  refreshData,
}: {
  show: boolean;
  invoiceId: string;
  handleClose: () => void;
  refreshData: () => void;
  prevTags?: string[];
}) {
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (prevTags !== []) {
      setTags(prevTags ? prevTags.toString() : "");
    } else {
      return;
    }
  }, [invoiceId]);

  const saveTags = (items: string[]) => {
    if (invoiceId === "") {
      throw Error("No hay invoice id especificado");
    }
    Axios.put(
      `/api/invoice/edit/${invoiceId}`,
      { tags: items },
      {
        headers: { auth: localStorage.getItem("bill-token") },
      }
    )
      .then(({ data }) => {
        notify.show("Datos guardados", "success");
        refreshData();
        handleClose();
      })
      .catch((err) => {
        notify.show(err.message, "error");
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const arrayFromString = tags.split(",");
    let processedArray = [];
    for (let item of arrayFromString) {
      processedArray.push(item.trim());
    }

    saveTags(processedArray);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar etiquetas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Etiquetas separadas por comas</Form.Label>
            <Form.Control
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="pendiente, seguimiento"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
