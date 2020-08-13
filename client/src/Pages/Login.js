import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { notify } from 'react-notify-toast'
import Axios from 'axios'
import { UserContext } from '../Context/UserContext'

export default function Login() {

    const user = useContext(UserContext)
    const [login, setLogin] = useState({ email: '', password: '' })
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    const rowStyle = {
        height: "calc(100vh - 56px)"
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setLogin({ ...login, [name]: value })
    }

    const onSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            notify.show('❌ Please check the data before continue', 'error')
        } else {
            event.stopPropagation();
            Axios.post(`/api/user/login`, login)
                .then(({ data }) => {
                    if (data.success) {
                        user.setUserData({
                            isLoggedIn: true,
                            token: data.data.token,
                            name: data.data.name
                        })
                        localStorage.setItem('bill-token', data.data.token)
                        notify.show(`✔ ${data.message}`, 'success')
                        history.push("/")
                    } else {
                        notify.show('❌ An error ocurred, please try again', 'error')
                    }
                }).catch(err => {
                    notify.show(`❌ ${err.response.data.message}`, 'error')
                })
        }

        setValidated(true);
    }

    return (
        <Container>
            <Row style={rowStyle} className='align-items-center'>
                <Col />
                <Col md={6} sm={12} className='shadow rounded bg-light p-3'>
                    <Form onSubmit={onSubmit} noValidate validated={validated}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' value={login.email} onChange={handleChange} required />
                            <Form.Control.Feedback type="invalid">Please enter a valid e-mail.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' value={login.password} onChange={handleChange} required />
                            <Form.Control.Feedback type="invalid">Please type your password.</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit"><FontAwesomeIcon icon={faCheckCircle} /> Login</Button>
                    </Form>
                </Col>
                <Col />
            </Row>
        </Container>
    )
}
