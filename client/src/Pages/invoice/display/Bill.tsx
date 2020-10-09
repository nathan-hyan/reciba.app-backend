import React from "react";
import { Row, Col } from "react-bootstrap";
import { invoice } from "../../../Interfaces/invoice";

export default function Bill({
  isOriginal = false,
  data,
}: {
  isOriginal?: boolean;
  data: invoice;
}) {
  return (
    <Row className="pdf-font my-5 py-5 bg-white">
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
          {isOriginal ? "Recibo Original" : "Recibo Duplicado"}
        </p>
      </Col>

      <Col className="px-5">
        <Row className="border-bottom mt-3 pb-3">
          <Col>
            {data.logo ? (
              <>
                <img src={data.logo} alt="RollingCode School" height="50" />
                <p className="text-monospace">
                  Recibo N°: {data.invoiceNumber}
                </p>
              </>
            ) : (
              <p className="text-monospace">Recibo N°: {data.invoiceNumber}</p>
            )}
          </Col>

          <Col md="2"></Col>

          <Col className="text-center">
            <p className="my-0">
              <strong>Fecha: </strong>
              {Intl.DateTimeFormat(navigator.language, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(data.date))}
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
                  {data.from}
                </p>
              </Col>
            </Row>

            <Row className="bg-light my-3">
              <Col>
                <p className="my-2">
                  <strong>La cantidad de: </strong>
                  {data.amountText}
                </p>
              </Col>
            </Row>
            <Row className="bg-light my-3">
              <Col>
                <p className="my-2">
                  <strong>En concepto de: </strong> {data.concept}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={2} className="bg-light">
            <p className="my-2">
              <strong>Son: </strong> {data.currency} ${data.amount}
            </p>
          </Col>
          <Col />
          <Col md={6} className="bg-light">
            <p className="my-2">
              <strong>Recibo por: </strong>
              <img src={data.sign} height="120" alt="signature" />
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
