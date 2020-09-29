import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { notify } from "react-notify-toast";
import Axios from "axios";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const User = useContext(UserContext);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  /**
   * Maneja el estado correspondiente a cada input
   *
   * @param e Input
   */
  const handleChange = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  /**
   * Envía los datos al servidor para guardar
   *
   * @param event Formulario
   */
  const onSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      notify.show("Por favor verifique los datos antes de continuar", "error");
    } else {
      event.stopPropagation();
      Axios.post(`/api/user/login`, login)
        .then(({ data }) => {
          if (data.success) {
            User.setUserData({
              isLoggedIn: true,
              token: data.data.token,
              name: data.data.name,
            });
            localStorage.setItem("bill-token", data.data.token);
            notify.show(`${data.message}`, "success");
            history.push("/");
          } else {
            notify.show("Ocurrió un error, por favor reintente", "error");
          }
        })
        .catch((err) => {
          notify.show(`${err.response.data.message}`, "error");
        });
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="h-100-minus align-items-center">
        <Col />
        <Col md={6} sm={12} className="shadow rounded bg-light p-3">
          <Form onSubmit={onSubmit} noValidate validated={validated}>
            <Form.Group>
              <Form.Label>Dirección de correo</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={login.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un e-mail válido
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingrese su contraseña
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faCheckCircle} /> Iniciar sesión
            </Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}
