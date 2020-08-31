import React, { useState } from "react";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notify } from "react-notify-toast";
import invoice from "../../Interfaces/invoice";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function GenerateInvoice() {
  const [state, setState] = useState<invoice>({
    invoiceNumber: 1,
    date: "",
    from: "",
    amountText: "",
    amount: 0,
    concept: "",
    sign: "",
    currency: "ARS",
  });

  const history = useHistory();

  const [validated, setValidated] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: {
    preventDefault: () => void;
    currentTarget?: any;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    e.stopPropagation();
    let { currentTarget } = e;
    if (currentTarget.checkValidity() === false) {
      notify.show("Please verify the form and try again", "error");
    } else {
      Axios.post(`/api/invoice/`, { ...state }).then(({ data }) => {
        if (data.id) {
          history.push(`/invoice/code/${data.id}`);
        }
        notify.show(data.message, "success");
      });
    }

    setValidated(true);
  };

  console.log(state);

  return (
    <Container>
      <Row className="h-100-minus align-items-center">
        <Col className="bg-light p-3 shadow rounded">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md="6" />
              <Col>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    required
                    name="date"
                    onChange={handleChange}
                    value={state.date}
                    type="date"
                  />
                  <Form.Control.Feedback type="invalid">
                    Date is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <p className="text-center">Received</p>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>From</Form.Label>
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
                  <Form.Label>Quantity</Form.Label>
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
                  <Form.Label>In concept of</Form.Label>
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
                  <Form.Label>Amount</Form.Label>
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
              <Col>
                <Form.Group>
                  <Form.Label>Sign</Form.Label>
                  <Form.Control
                    disabled
                    name="sign"
                    onChange={handleChange}
                    value="Al guardar se generara el código QR"
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-right">
                <Button variant="secondary" className="mr-3">
                  <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                </Button>
                <Button variant="primary" type="submit">
                  <FontAwesomeIcon icon={faSave} /> Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
