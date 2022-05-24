import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../components/Navbars/Navbar';
import Footer from '../components/Footers/Footer';
import routes from '../routes';

const Layout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

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
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
