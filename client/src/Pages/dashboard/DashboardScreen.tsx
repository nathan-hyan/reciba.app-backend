import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import invoice from "../../Interfaces/invoice";
import Filter from "./Filter";
import InvoicesList from "./InvoicesList";
import PaginationBar from "./PaginationBar";

export default function DashboardScreen() {
  const [pendingBills, setPendingBills] = useState<invoice[]>([]);
  const [completedBills, setCompletedBills] = useState<invoice[]>([]);

  useEffect(() => {
    const completedBills = Axios.get(`/api/invoice/completed`);
    const pendingBills = Axios.get(`/api/invoice/pending`);

    Axios.all([completedBills, pendingBills]).then(
      Axios.spread((...response) => {
        setCompletedBills(response[0].data.data);
        setPendingBills(response[1].data.data);
      })
    );
  }, []);

  return (
    <Container className="my-5">
      <Row className="h-100-minus d-flex  align-items-center">
        <Col>
          <Filter />
          <InvoicesList completed={completedBills} pending={pendingBills} />
          <PaginationBar />
        </Col>
      </Row>
    </Container>
  );
}
