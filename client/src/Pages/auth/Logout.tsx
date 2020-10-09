import React, { useContext, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Logout() {
  const User = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("bill-token");
    User.setUserData({
      isLoggedIn: false,
      level: 9,
      token: "",
      name: "",
    });

    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Row className="h-100-minus align-items-center">
        <Col className="text-center">
          <h1>
            Que lástima verte partir{" "}
            <span role="img" aria-label="sad">
              😢
            </span>
          </h1>
          <p>¡Ojalá podamos volverte a ver!</p>
          <Button className="mt-5" onClick={() => history.push("/")}>
            Ir a la página principal
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
