import {
  faPen,
  faPrint,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import invoice from "../../Interfaces/invoice";
import TagsModal from "./TagsModal";

export default function InvoicesList({
  completed,
  pending,
  deleteBill,
  refreshData,
}: {
  completed: invoice[];
  pending: invoice[];
  deleteBill: (id: string | undefined) => void;
  refreshData: () => void;
}) {
  const history = useHistory();
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [tagData, setTagData] = useState<{ id: string; prevTags: string[] }>({
    id: "",
    prevTags: [],
  });

  const toggleTagsModal = (id = "", prevTags: string[] = []) => {
    setTagData({
      id,
      prevTags,
    });
    setShowTagsModal((prevState) => !prevState);
  };

  return (
    <>
      <TagsModal
        show={showTagsModal}
        handleClose={() => toggleTagsModal()}
        invoiceId={tagData.id}
        prevTags={tagData.prevTags}
        refreshData={refreshData}
      />
      <Col className="bg-white rounded shadow p-3 mb-3">
        <small className="text-muted">
          Boletas pendientes - {pending.length}
        </small>
        <ListGroup>
          {pending.map((invoice, index) => {
            return (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md="1">
                    {Intl.DateTimeFormat(navigator.language, {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(invoice.date))}{" "}
                  </Col>
                  <Col>
                    {invoice.from}{" "}
                    {invoice.tags?.map((item, index) => (
                      <Badge key={index} variant="info" className="ml-1">
                        {item}
                      </Badge>
                    ))}
                  </Col>
                  <Col md="2" className="text-right text-primary">
                    <FontAwesomeIcon
                      icon={faTag}
                      onClick={() => toggleTagsModal(invoice._id, invoice.tags)}
                    />
                    <FontAwesomeIcon
                      onClick={() =>
                        history.push(`/invoice/edit/${invoice._id}/`)
                      }
                      className="pointer mx-3"
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
            );
          })}
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
                <Col>
                  {invoice.from}{" "}
                  {invoice.tags?.map((item, index) => (
                    <Badge variant="info" className="ml-1">
                      {item}
                    </Badge>
                  ))}{" "}
                </Col>
                <Col md="2" className="text-right text-primary">
                  <FontAwesomeIcon
                    className="pointer"
                    icon={faTag}
                    onClick={() => toggleTagsModal(invoice._id, invoice.tags)}
                  />

                  <FontAwesomeIcon
                    onClick={() =>
                      history.push(`/invoice/edit/${invoice._id}/`)
                    }
                    className="ml-3 pointer"
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
    </>
  );
}
