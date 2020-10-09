import { faShare, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { notify } from "react-notify-toast";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { invoice } from "../../../Interfaces/invoice";
import DownloadModal from "./DownloadModal";
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
  const { socketId, invoiceId } = useParams<any>();
  const [showModal, setShowModal] = useState(false);
  const [PDFFile, setPDFFile] = useState("");
  const [state, setState] = useState<Partial<invoice>>({});

  useEffect(() => {
    if (socketId) {
      socket.emit("join", socketId);
      socket.emit("close", false);
    } else if (invoiceId) {
      Axios.get(`/api/invoice/single/${invoiceId}`)
        .then(({ data }) => {
          if (data.success) {
            setState(data.data);
          }
        })
        .catch((err: any) => alert(err.response.data.message));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("pdf", (file: string) => {
      setPDFFile(file);
      showDeleteModal();
    });
  });

  const sendSign = () => {
    socket.emit("sign", signatureRef.current.toDataURL());
  };

  const showDeleteModal = () => {
    setShowModal(!showModal);
  };

  const submitSignature = () => {
    if (window.confirm(`¿Confirma el envio de la firma a ${state.from}?`)) {
      Axios.put(`/api/invoice/addSignature/${invoiceId}`, {
        ...state,
        sign: signatureRef.current.toDataURL(),
      })
        .then((response) => {
          notify.show(
            "Se ha firmado correctamente. Ya puede salir de esta app.",
            "success"
          );
        })
        .catch((err) => {
          notify.show(
            "Ocurrió un error enviando la firma. Reintente por favor.",
            "error"
          );
        });
    } else {
      console.log(false);
    }
  };

  console.log("Socket id:", socketId);
  console.log("Invoice Id:", invoiceId);

  return (
    <Container className="h-100-minus mt-5">
      <DownloadModal
        PDFFile={PDFFile}
        show={showModal}
        handleClose={showDeleteModal}
      />
      <Row className={invoiceId ? "d-block" : "d-none"}>
        <Col className="text-center">
          <h1>¡Hola!</h1>

          <p>
            Recibió esta boleta de <strong>{state.from}</strong> con el concepto
            de <strong>{state.concept}</strong> por el monto total de{" "}
            <strong>
              {state.currency} {state.amount}
            </strong>
          </p>

          <hr />
        </Col>
      </Row>
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
            <FontAwesomeIcon icon={faTimesCircle} /> Reiniciar Firma
          </Button>
        </Col>
        <Col className={invoiceId ? "d-block" : "d-none"}>
          <Button className="w-100" variant="success" onClick={submitSignature}>
            <FontAwesomeIcon icon={faShare} /> Enviar firma
          </Button>
        </Col>
      </Row>
      <Row className={socketId ? "d-block my-5 text-center" : "d-none"}>
        <Col>
          <p className="lead">¡No cierre esta página!</p>
          <p>
            Cuando se genere el comprobante, debajo aparecerá un botón para
            descargarlo
          </p>
        </Col>
      </Row>
    </Container>
  );
}
