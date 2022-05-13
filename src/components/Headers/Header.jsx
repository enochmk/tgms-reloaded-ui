import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import HeaderCard from './HeaderCard';

const Header = () => {
	return (
		<>
			<div className='header bg-gradient-danger pb-8 pt-5 pt-md-8'>
				<Container fluid>
					<div className='header-body'>
						<Row className='mb-5'>
							<Col lg='6' xl='4'>
								<HeaderCard
									title='Total Dataset'
									color='danger'
									value='350,897'
									icon='fa-chart-bar'
								/>
							</Col>
							<Col lg='6' xl='4'>
								<HeaderCard
									title='Unique Subscribers'
									color='warning'
									value='2,356'
									icon='fa-chart-pie'
								/>
							</Col>
							<Col lg='6' xl='4'>
								<HeaderCard
									title='Winners'
									color='yellow'
									value='924'
									icon='fa-users'
								/>
							</Col>
						</Row>
						<Container fluid className='d-flex justify-content-center mt-5'>
							<button className='btn btn-lg btn-primary'>Load File</button>
						</Container>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Header;
