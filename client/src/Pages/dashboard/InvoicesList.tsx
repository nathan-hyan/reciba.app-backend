import { faPen, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import invoice from "../../Interfaces/invoice";

export default function InvoicesList({
  completed,
  pending,
  deleteBill,
}: {
  completed: invoice[];
  pending: invoice[];
  deleteBill: (id: string | undefined) => void;
}) {
  const history = useHistory();

  return (
    <Col className="bg-white rounded shadow p-3 mb-3">
      <small className="text-muted">
        Boletas pendientes - {pending.length}
      </small>
      <ListGroup>
        {pending.map((invoice, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md="1">
                {Intl.DateTimeFormat(navigator.language, {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(invoice.date))}{" "}
              </Col>
              <Col>{invoice.from}</Col>
              <Col md="2" className="text-right text-primary">
                <FontAwesomeIcon
                  onClick={() => history.push(`/invoice/edit/${invoice._id}/`)}
                  className="pointer mr-3"
                  icon={faPen}
                />
                <FontAwesomeIcon
                  onClick={() => deleteBill(invoice._id)}
                  className="pointer"
                  icon={faTrash}
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
      <small className="text-muted">
        Boletas finalizadas - {completed.length}
      </small>
      <ListGroup>
        {completed.map((invoice, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md="1">
                {Intl.DateTimeFormat(navigator.language, {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(invoice.date))}{" "}
              </Col>
              <Col>{invoice.from}</Col>
              <Col md="2" className="text-right text-primary">
                <FontAwesomeIcon
                  onClick={() => history.push(`/invoice/edit/${invoice._id}/`)}
                  className="pointer"
                  icon={faPen}
                />
                <FontAwesomeIcon
                  onClick={() =>
                    history.push(`/invoice/display/${invoice._id}/no`)
                  }
                  icon={faPrint}
                  className="mx-3 pointer"
                />
                <FontAwesomeIcon
                  onClick={() => deleteBill(invoice._id)}
                  className="pointer"
                  icon={faTrash}
                />
              </Col>
            </Row>{" "}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
}
