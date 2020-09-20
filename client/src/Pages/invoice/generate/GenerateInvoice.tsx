import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import {
  faSave,
  faTimesCircle,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notify } from "react-notify-toast";
import invoice from "../../../Interfaces/invoice";
import Axios from "axios";
import { useHistory } from "react-router-dom";

// Socket.io stuff
import io from "socket.io-client";
import ShowQRCodeModal from "../qr/ShowQRCodeModal";
import { IdGeneration } from "../../../Context/IdGeneration";
const ENDPOINT =
  process.env.NODE_ENV !== "production"
    ? "http://192.168.100.6:8000"
    : "https://billsapp.herokuapp.com/";
const socket = io.connect(ENDPOINT, { transports: ["websocket"] });

export default function GenerateInvoice() {
  var date = new Date().toISOString().substr(0, 10);

  // Get uniqueId for this session
  const { currentId, generateId } = useContext(IdGeneration);

  //Setting up state
  const [state, setState] = useState<invoice>({
    invoiceNumber: 1,
    date,
    from: "",
    amountText: "",
    amount: 0,
    concept: "",
    currency: "ARS",
  });
  const [validated, setValidated] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);

  // Setting up history
  const history = useHistory();

  /**
   * Opens and closes QRCode modal
   */
  const toggleShowQRCodeModal = () => {
    setShowQRCodeModal((i) => !i);
  };

  const showQRCodeModalAndGenerateCode = async () => {
    await generateId();
    socket.emit("join", currentId);
    setShowQRCodeModal((i) => !i);
  };

  /**
   * Keeps track of inputs and saves them to state
   * @param e Input
   */
  const handleChange = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  /**
   * Saves invoice to database
   * @param e Form
   */
  const handleSubmit = (e: {
    preventDefault: () => void;
    currentTarget?: any;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    let { currentTarget } = e;
    if (!state.sign) {
      notify.show("Se necesita la firma para continuar", "error");
      return null;
    }

    if (currentTarget.checkValidity() === false) {
      notify.show("Please verify the form and try again", "error");
    } else {
      Axios.post(`/api/invoice/`, { ...state }).then(({ data }) => {
        if (data.id) {
          history.push(`/invoice/display/${data.id}/${currentId}`);
        }
        notify.show(data.message, "success");
      });
    }

    setValidated(true);
  };

  /**
   * Checks everytime there's an update on Socket
   */
  useEffect(() => {
    socket.on("sign", (data: any) => {
      setState({ ...state, sign: data });
    });

    if (showQRCodeModal) {
      socket.on("close", () => {
        notify.show("Teléfono conectado", "success");
        setShowQRCodeModal(false);
      });
    }
  });

  useEffect(() => {
    // Generate currentId and assign it to IO.Socket
    if (currentId !== "") {
      socket.emit("join", currentId);
    }
  }, [currentId]);

  return (
    <Container>
      <ShowQRCodeModal show={showQRCodeModal} onHide={toggleShowQRCodeModal} />
      <Row className="h-100-minus align-items-center">
        <Col className="bg-light p-3 shadow rounded">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    required
                    name="date"
                    onChange={handleChange}
                    value={state.date.toString()}
                    type="date"
                  />
                  <Form.Control.Feedback type="invalid">
                    La fecha es necesaria
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <p className="text-center">Recibo</p>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>De</Form.Label>
                  <Form.Control
                    required
                    name="from"
                    onChange={handleChange}
                    value={state.from}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    required
                    name="amountText"
                    onChange={handleChange}
                    value={state.amountText}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>En concepto de</Form.Label>
                  <Form.Control
                    required
                    name="concept"
                    onChange={handleChange}
                    value={state.concept}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={3}>
                <Form.Group>
                  <Form.Label>Cantidad</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <select
                          name="currency"
                          onChange={handleChange}
                          value={state.currency}
                          className="no-decoration"
                        >
                          <option>ARS</option>
                          <option>USD</option>
                        </select>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      required
                      name="amount"
                      onChange={handleChange}
                      value={state.amount}
                      min={1}
                      type="number"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col className="text-right">
                <p className="lead">Firma</p>
              </Col>
              <Col>
                {state.sign ? (
                  <img height="100" src={state.sign} alt="signature" />
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col className="text-right">
                <Button
                  variant="info"
                  onClick={showQRCodeModalAndGenerateCode}
                  className="mr-3"
                >
                  <FontAwesomeIcon icon={faQrcode} /> Mostrar QR para firmar
                </Button>
                <Button
                  variant="secondary"
                  className="mr-3"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  <FontAwesomeIcon icon={faTimesCircle} /> Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  <FontAwesomeIcon icon={faSave} /> Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
