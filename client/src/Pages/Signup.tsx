import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { notify } from 'react-notify-toast';
import { UserContext } from '../Context/UserContext';

export default function Signup() {
	const history = useHistory();
	const user = useContext(UserContext);

	const [ state, setState ] = useState({
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [ validated, setValidated ] = useState(false);

	const handleSubmit = (e: { preventDefault: () => void; currentTarget: any; stopPropagation: () => void }) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			notify.show('❌ Please check the data before continue', 'error');
		} else {
			e.stopPropagation();
			Axios.post('/api/user/register', { email: state.email, password: state.password, name: state.name })
				.then((response) => {
					if (response.data.success) {
						Axios.post(`/api/user/login`, { email: state.email, password: state.password })
							.then(({ data }) => {
								if (data.success) {
									user.setUserData({
										isLoggedIn: true,
										token: data.data.token,
										name: data.data.name,
									});
									localStorage.setItem('bill-token', data.data.token);
									notify.show(`✔ ${data.message}`, 'success');
									history.push('/');
								} else {
									notify.show('❌ An error ocurred, please try again', 'error');
								}
							})
							.catch((err) => {
								notify.show(`❌ ${err.response.data.message}`, 'error');
							});
					} else {
						notify.show(`❌ Error: ${response.data.message}`, 'error');
					}
				})
				.catch((err) => {
					try {
						console.log(err.response);
						notify.show(`❌ ${err.response.data.message}`, 'error');
					} catch (err) {
						notify.show(`❌ ${err.message}`, 'error');
					}
				});
		}

		setValidated(true);
	};

	const handleChange = (e: { target: { name: any; value: any } }) => {
		let { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	return (
		<Container>
			<Row className='h-100-minus align-items-center'>
				<Col>
					<h1>Sign in to get more features</h1>
					<p className='lead'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, nisi. Provident ipsum praesentium
						numquam sapiente.
					</p>
				</Col>
				<Col className='bg-light shadow p-3 rounded'>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type='text' name='name' onChange={handleChange} value={state.name} required />
							<Form.Control.Feedback type='invalid'>Please enter your name.</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								name='email'
								onChange={handleChange}
								value={state.email}
								required
							/>
							<Form.Control.Feedback type='invalid'>Please enter a valid e-mail.</Form.Control.Feedback>
						</Form.Group>
						<Row>
							<Col>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										name='password'
										onChange={handleChange}
										value={state.password}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										Please enter a password.
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Label>Repeat password</Form.Label>
									<Form.Control
										type='password'
										name='repeatPassword'
										onChange={handleChange}
										value={state.repeatPassword}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										Please check if both password are the same.
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<Button variant='primary' type='submit'>
							<FontAwesomeIcon icon={faCheck} /> Sign up!
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
