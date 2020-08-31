import React, { useRef } from "react";
import Axios from "axios";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { notify } from "react-notify-toast";
const SignaturePad = require("react-signature-pad");

export default function Signature() {
  const signatureRef: any = useRef();
  const { id } = useParams();
  const history = useHistory();

  const saveSignature = () => {
    Axios.put(`/api/invoice/addSignature/${id}`, {
      sign: signatureRef.current.toDataURL(),
    })
      .then((response) => {
        let { message, success } = response.data;

        if (success) {
          notify.show(message, "success");
          history.push(`/invoice/display/${id}`);
        } else {
          notify.show("Ocurrió un error, reintente por favor", "error");
        }
      })
      .catch((err) => {
        if (err.response.data) {
          notify.show(err.response.data.message, "error");
        }
        notify.show(err.message, "error");
      });
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
        <Col className="bg-white shadow rounded">
          <SignaturePad ref={signatureRef} />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <Button
            className="w-100"
            variant="danger"
            onClick={() => signatureRef.current.clear()}
          >
            Reiniciar Firma
          </Button>
        </Col>

        <Col>
          <Button className="w-100" variant="primary" onClick={saveSignature}>
            Aceptar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
