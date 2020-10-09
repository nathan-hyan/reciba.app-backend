import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { notify } from "react-notify-toast";
import { useHistory } from "react-router-dom";
import { invoice } from "../../Interfaces/invoice";
import LoadingScreen from "../../Layout/LoadingScreen";
import InvoicesList from "./InvoicesList";

export default function DashboardScreen() {
  const history = useHistory();
  const [pendingBills, setPendingBills] = useState<invoice[]>([]);
  const [completedBills, setCompletedBills] = useState<invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosHeaders = {
    headers: { auth: localStorage.getItem("bill-token") },
  };

  const getBills = () => {
    setIsLoading(true);
    const completedBills = Axios.get(`/api/invoice/completed`, axiosHeaders);
    const pendingBills = Axios.get(`/api/invoice/pending`, axiosHeaders);

    Axios.all([completedBills, pendingBills])
      .then(
        Axios.spread((...response) => {
          setCompletedBills(response[0].data.data);
          setPendingBills(response[1].data.data);
          setIsLoading(false);
        })
      )
      .catch((err) => {
        notify.show("Ocurrió un error trayendo los datos", "error");
        history.push("/");
      });
  };

  const deleteBill = (id: string | undefined) => {
    if (
      id !== undefined &&
      window.confirm("Advertencia, se borrará la boleta. ¿Desea Confirmar?")
    ) {
      Axios.delete(`/api/invoice/${id}`, axiosHeaders)
        .then((res) => {
          if (res.data.success) {
            notify.show("Boleta eliminada", "success");
            getBills();
          } else {
            notify.show(res.data.message, "warning");
          }
        })
        .catch((err) => {
          notify.show(err.response.data.message, "error");
        });
    }
  };

  useEffect(() => {
    getBills();
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="my-5">
        <Row className="h-100-minus">
          <Col>
            {/* <Filter /> */}
            <InvoicesList
              refreshData={getBills}
              deleteBill={(id: string | undefined) => deleteBill(id)}
              completed={completedBills}
              pending={pendingBills}
            />
            {/* <PaginationBar /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
