import { Container, Row, Col } from 'reactstrap';

import HeaderCard from './HeaderCard';

const Header = ({ count, isLoading }) => {
  const { winners, unique, total } = count;

  return (
    <div className="header bg-gradient-airteltigo py-1">
      <Container fluid className="header-body">
        <div className="mt-4 p-4 text-white rounded text-center">
          <h2 className="text-white display-4 font-bold">Statistics</h2>
          <Row className="mb-5">
            <Col lg="6" xl="4">
              <HeaderCard
                isLoading={isLoading}
                title="Total Tickets"
                color="danger"
                value={total.toLocaleString()}
                icon="fa-chart-bar"
              />
            </Col>
            <Col lg="6" xl="4">
              <HeaderCard
                isLoading={isLoading}
                title="Unique Subscribers"
                color="warning"
                value={unique.toLocaleString()}
                icon="fa-chart-pie"
              />
            </Col>
            <Col lg="6" xl="4">
              <HeaderCard
                isLoading={isLoading}
                title="Winners"
                color="yellow"
                value={winners.toLocaleString()}
                icon="fa-users"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Header;
