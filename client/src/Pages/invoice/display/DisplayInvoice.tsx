import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import invoice from "../../../Interfaces/invoice";
import Axios from "axios";
import { useParams } from "react-router-dom";

export default function DisplayInvoice() {
  const { id } = useParams<any>();

  const [state, setState] = useState<invoice>({
    invoiceNumber: 1,
    logo: "",
    date: new Date(),
    from: "",
    amountText: "",
    amount: 0,
    concept: "",
    sign: "",
    currency: "ARS",
  });

  useEffect(() => {
    Axios.get(`/api/invoice/single/${id}`).then(({ data }) => {
      setState({ ...data.data });
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row className="py-5 bg-white">
        <Col md={1}>
          <p
            className="text-muted p-0 mb-0 text-center"
            style={{
              height: 64,
              marginTop: 150,
              width: 109,
              paddingLeft: 0,
            }}
          >
            Recibo Original
          </p>
        </Col>

        <Col className="px-5">
          <Row className="border-bottom mt-3 pb-3">
            <Col>
              {state.logo ? (
                <>
                  <img src={state.logo} alt="RollingCode School" height="50" />
                  <p className="text-monospace">
                    Recibo N°: {state.invoiceNumber}
                  </p>
                </>
              ) : (
                <p className="text-monospace">
                  Recibo N°: {state.invoiceNumber}
                </p>
              )}
            </Col>

            <Col md="2"></Col>

            <Col className="text-center">
              <p className="my-0">
                <strong>Fecha: </strong>
                {/* {moment(state.date).utc().format("L")} */}
                {new Intl.DateTimeFormat("es-AR").format(state.date)}
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Row className="bg-light my-3">
                <Col md={3}>
                  <p className="text-center my-2">
                    <strong>Recibí</strong>
                  </p>
                </Col>
                <Col>
                  <p className="my-2">
                    <strong>De: </strong>
                    {state.from}
                  </p>
                </Col>
              </Row>

              <Row className="bg-light my-3">
                <Col>
                  <p className="my-2">
                    <strong>La cantidad de: </strong>
                    {state.amountText}
                  </p>
                </Col>
              </Row>
              <Row className="bg-light my-3">
                <Col>
                  <p className="my-2">
                    <strong>En concepto de: </strong> {state.concept}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={2} className="bg-light">
              <p className="my-2">
                <strong>Son: </strong> {state.currency} ${state.amount}
              </p>
            </Col>
            <Col />
            <Col md={6} className="bg-light">
              <p className="my-2">
                <strong>Recibo por: </strong>
                <img src={state.sign} height="120" alt="signature" />
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
