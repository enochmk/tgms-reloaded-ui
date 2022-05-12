import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebars/Sidebar';
import Navbar from '../components/Navbars/Navbar';
import Footer from '../components/Footers/Footer';

const Layout = () => {
	return (
		<div style={{ height: '100vh' }}>
			<Sidebar />
			<main className='main-content h-100 min-height-vh-100 max-height-vh-100 d-flex flex-column'>
				<Navbar />
				<Outlet />
				<Footer />
			</main>
		</div>
	);
};

export default Layout;
