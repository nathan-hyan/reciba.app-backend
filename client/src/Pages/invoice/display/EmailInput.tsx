import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Form, Button } from "react-bootstrap";

export default function EmailInput({
  sendEmail,
  setRecipient,
  recipient,
  validated,
}: {
  sendEmail: (e: any) => void;
  setRecipient: (e: any) => void;
  recipient: string;
  validated: boolean;
}) {
  return (
    <Col className="px-5 py-3 bg-white shadow rounded">
      <Form noValidate onSubmit={sendEmail} validated={validated}>
        <Form.Group>
          <Form.Label>Dirección de e-mail</Form.Label>
          <Form.Control
            type="email"
            value={recipient}
            onChange={setRecipient}
            placeholder="correo@server.com"
            required
          />
          <Form.Control.Feedback type="invalid">
            Se necesita un E-mail válido
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faPaperPlane} /> Enviar
        </Button>
      </Form>
    </Col>
  );
}
