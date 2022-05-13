import React from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

function HeaderCard({ title, icon, value, color }) {
	return (
		<Card className='card-stats mb-4 mb-xl-0'>
			<CardBody>
				<Row>
					<div className='col'>
						<CardTitle tag='h5' className='text-uppercase text-muted mb-0'>
							{title}
						</CardTitle>
						<span className='h2 font-weight-bold mb-0'>{value}</span>
					</div>
					<Col className='col-auto'>
						<div
							className={`icon icon-shape bg-${color} text-white rounded-circle shadow`}>
							<i className={'fas ' + icon} />
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
}

export default HeaderCard;
