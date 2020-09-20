import React from "react";
import { Col, Button } from "react-bootstrap";

export default function ButtonsGroup({
  exportPDFToFile,
  transformPDFToBase64,
  toggleEmailInput,
}: {
  exportPDFToFile: () => void;
  transformPDFToBase64: () => void;
  toggleEmailInput: () => void;
}) {
  return (
    <Col className="p-3 bg-light text-center shadow rounded">
      <Button className="mx-2" onClick={exportPDFToFile}>
        Download PDF
      </Button>
      <Button className="mx-2" onClick={transformPDFToBase64}>
        Send PDF to Mobile
      </Button>
      <Button onClick={toggleEmailInput} className="mx-2">
        Send copy via E-mail
      </Button>
    </Col>
  );
}
