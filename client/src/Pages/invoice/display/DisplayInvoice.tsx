import React, { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import invoice from "../../../Interfaces/invoice";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { savePDF } from "@progress/kendo-react-pdf";
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import Bill from "./Bill";
import io from "socket.io-client";
import ButtonsGroup from "./ButtonsGroup";
import { notify } from "react-notify-toast";
import EmailInput from "./EmailInput";

const ENDPOINT =
  process.env.NODE_ENV !== "production"
    ? "http://192.168.100.6:8000"
    : "https://billsapp.herokuapp.com/";
const socket = io.connect(ENDPOINT, { transports: ["websocket"] });

export default function DisplayInvoice() {
  const invoice = useRef<any>(<div />);
  const { id, socketId } = useParams<any>();

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
    pending: false,
  });
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    Axios.get(`/api/invoice/single/${id}`).then(({ data }) => {
      const { year, month, date } = dateTransformer(data.data.date);
      setState({ ...data.data, date: new Date(year, month, date) });
    });
    //eslint-disable-next-line
  }, []);

  /**
   * Adapta la fecha para poder ser parseada sin necesidad de usar Moment
   *
   * @param input Fecha en formato (YYYY-MM-DD)
   */
  const dateTransformer = (input: string) => {
    let dateWithoutTime = input.slice(0, 10);
    let dateArray = dateWithoutTime.split("-");
    let year: number = parseInt(dateArray[0]);
    let month: number = parseInt(dateArray[1], 10) - 1;
    let date: number = parseInt(dateArray[2]);

    return { year, month, date };
  };

  /**
   * Guarda el contenido del DOM a PDF para descargar
   */
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

  /**
   * Transformar el DOM que contiene el PDF a Base64
   */
  const transformPDFToBase64 = () => {
    const base64 = drawDOM(invoice.current, {
      paperSize: "A4",
      landscape: true,
      scale: 0.75,
    }).then((group) => {
      return exportPDF(group);
    });

    return base64;
  };

  const emitPDFViaSocket = async () => {
    socket.emit("pdf", await transformPDFToBase64());
  };

  /**
   * Enviar base64 del PDF por email al recipiente especificado
   */
  const sendEmail = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const file = await transformPDFToBase64();

    if (form.checkValidity() === true) {
      Axios.post("/api/mail/send/invoice", {
        file,
        date: state.date,
        email: recipient,
      })
        .then(({ data }) => {
          let { success, message } = data;

          if (success) {
            notify.show(message, "success");
          } else {
            notify.show(message, "error");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    if (socketId !== "") {
      socket.emit("join", socketId);
    }
  }, [socketId]);

  return (
    <Container>
      <Row className="my-5">
        <ButtonsGroup
          exportPDFToFile={exportPDFToFile}
          transformPDFToBase64={emitPDFViaSocket}
          toggleEmailInput={() => setShowEmail(!showEmail)}
          hasSocketId={socketId === "no"}
        />
      </Row>
      <Row className={showEmail ? "d-block" : "d-none"}>
        <EmailInput
          recipient={recipient}
          sendEmail={(e) => sendEmail(e)}
          setRecipient={(e) => setRecipient(e.target.value)}
          validated={validated}
        />
      </Row>
      <div ref={invoice}>
        <Bill data={state} isOriginal />
        <Bill data={state} />
      </div>
    </Container>
  );
}
