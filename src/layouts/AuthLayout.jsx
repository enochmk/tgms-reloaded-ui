import { useContext, useRef } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { Container } from 'reactstrap';

// core components
import Footer from '../components/Footers/Footer';
import { UserContext } from '../contexts/UserContext';
import LoginImg from '../assets/img/wallpapers/Login.png';

const wallpaperStyle = {
  backgroundImage: 'url(' + LoginImg + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '100%',
};

const Auth = () => {
  const mainContent = useRef(null);
  const location = useLocation();
  const userContext = useContext(UserContext);
  const from = location.state ? location.state.from : '/';
  const isLoggedIn = userContext.isLoggedIn;

  if (isLoggedIn) return <Navigate to={from} />;

  return (
    <main style={wallpaperStyle}>
      <div className="main-content" ref={mainContent}>
        <div className="header py-7 py-lg-8"></div>
        {/* Page content */}
        <Container className="mt--8 pb-5 d-flex justify-content-center">
          <Outlet />
        </Container>
      </div>
      <Footer />
    </main>
  );
};

export default Auth;
