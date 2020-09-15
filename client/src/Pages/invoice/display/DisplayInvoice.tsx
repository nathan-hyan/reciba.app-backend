import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import invoice from "../../../Interfaces/invoice";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactDOM from "react-dom";
import { notify } from "react-notify-toast";
import Bill from "./Bill";

export default function DisplayInvoice() {
  const invoice = useRef<any>(<div />);
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
      let dateWithoutTime = data.data.date.slice(0, 10);
      let dateArray = dateWithoutTime.split("-");
      let year = dateArray[0];
      let month = parseInt(dateArray[1], 10) - 1;
      let date = dateArray[2];
      setState({ ...data.data, date: new Date(year, month, date) });
    });
    //eslint-disable-next-line
  }, []);

  const exportPDFToFile = () => {
    savePDF(invoice.current, {
      paperSize: "A4",
      fileName: `Invoice - ${Intl.DateTimeFormat(navigator.language, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }).format(new Date(state.date))} - ${id}`,
      landscape: true,
      scale: 0.75,
    });
  };

  return (
    <Container>
      <Row className="my-5">
        <Col className="p-3 bg-light text-center shadow rounded">
          <Button className="mx-2" onClick={exportPDFToFile}>
            Download PDF
          </Button>
          <Button
            onClick={() => notify.show("Not yet implemented", "error")}
            className="mx-2"
          >
            Send copy via E-mail
          </Button>
        </Col>
      </Row>
      <div ref={invoice}>
        <Bill data={state} isOriginal />
        <Bill data={state} />
      </div>
    </Container>
  );
}
