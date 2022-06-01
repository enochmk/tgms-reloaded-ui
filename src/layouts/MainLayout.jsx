import { useContext, useEffect, useRef } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

import Navbar from '../components/Navbars/Navbar';
import Footer from '../components/Footers/Footer';
import routes from '../routes';
import DrawProvider from '../contexts/DrawContext';
import { UserContext } from '../contexts/UserContext';

const MainLayout = () => {
  const mainContent = useRef(null);
  const location = useLocation();
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.isLoggedIn;

  if (!isLoggedIn) return <Navigate to="/login" />;

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname === routes[i].path) {
        return routes[i].name;
      }
    }

    return 'Brand';
  };

  return (
    <div style={{ height: '100%' }}>
      <main className="main-content h-100" ref={mainContent}>
        <Navbar brandText={getBrandText()} />
        <DrawProvider>
          <Outlet />
        </DrawProvider>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
