import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebars/Sidebar';
// import Navbar from '../components/Navbars/Navbar';
// import Footer from '../components/Footers/Footer';

import routes from '../routes';

const Layout = () => {
	const mainContent = React.useRef(null);

	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContent.current.scrollTop = 0;
	}, [location]);

	return (
		<>
			<Sidebar routes={routes} />
			<main className='main-content' ref={mainContent}>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
