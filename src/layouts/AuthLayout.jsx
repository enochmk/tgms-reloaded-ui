import { useContext, useRef } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// core components
import Footer from '../components/Footers/Footer';
import { UserContext } from '../contexts/UserContext';

const Auth = () => {
  const mainContent = useRef(null);
  const location = useLocation();
  const userContext = useContext(UserContext);
  const from = location.state ? location.state.from : '/';
  const isLoggedIn = userContext.isLoggedIn;

  if (isLoggedIn) return <Navigate to={from} />;

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <div className="header bg-airteltigo-danger py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Togumeso Reloaded!</h1>
                  <h4 className="text-lead text-light">
                    Sign in to perform the Weekly Draw.
                  </h4>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5 d-flex justify-content-center">
          <Outlet />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
