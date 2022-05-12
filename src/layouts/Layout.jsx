import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebars/Sidebar';
import Navbar from '../components/Navbars/Navbar';
import Footer from '../components/Footers/Footer';

const Layout = () => {
	return (
		<>
			<Sidebar />
			<main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
				<Navbar />
				<Outlet />
				<Footer />
			</main>
		</>
	);
};

export default Layout;
