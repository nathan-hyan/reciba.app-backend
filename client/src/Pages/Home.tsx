import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
	return (
		<Container>
			<Row className='h-100-minus align-items-center'>
				<Col>
					<h1>
						The place for your invoice needs!{' '}
						<span role='img' aria-label='Page'>
							📃
						</span>
					</h1>

					<p className='lead'>
						Stop using paper when handing invoices to clients. Send the invoice, the client signs it with
						their phone and everyone involved receives a copy via e-mail! Is that easy!.{' '}
					</p>

					<Link to='/invoice/generate'>
						<Button>
							<FontAwesomeIcon icon={faLink} /> Start Now
						</Button>
					</Link>
				</Col>

				<Col className='text-right'>
					<h3>this is page... welcome</h3>
				</Col>
			</Row>
		</Container>
	);
}
