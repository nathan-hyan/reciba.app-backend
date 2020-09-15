import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export default function Logout() {
	return (
		<Container>
			<Row className='h-100-minus align-items-center'>
				<Col>
					<h1>
						Sad to see you go{' '}
						<span role='img' aria-label='sad'>
							😢
						</span>
					</h1>
					<p>Hope you come back soon!</p>
				</Col>
			</Row>
		</Container>
	);
}
