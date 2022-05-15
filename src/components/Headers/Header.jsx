import { Container, Row, Col } from 'reactstrap';
import HeaderCard from './HeaderCard';
import FileUpload from '../Modals/FileUpload';

const Header = () => {
  return (
    <div className="header bg-gradient-danger pb-8 pt-5 pt-md-8">
      <Container fluid className="header-body">
        <Row className="mb-5">
          <Col lg="6" xl="4">
            <HeaderCard
              title="Total Dataset"
              color="danger"
              value="N/A"
              icon="fa-chart-bar"
            />
          </Col>
          <Col lg="6" xl="4">
            <HeaderCard
              title="Unique Subscribers"
              color="warning"
              value="N/A"
              icon="fa-chart-pie"
            />
          </Col>
          <Col lg="6" xl="4">
            <HeaderCard
              title="Winners"
              color="yellow"
              value="N/A"
              icon="fa-users"
            />
          </Col>
        </Row>
        <FileUpload />
      </Container>
    </div>
  );
};

export default Header;
