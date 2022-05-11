import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebars/Sidebar';
import Navbar from '../components/Navbars/Navbar';
import Footer from '../components/Footers/Footer';

const Layout = () => {
	return (
		<>
			<Sidebar />
			<main>
				<Navbar />
				<Outlet />
				<Footer />
			</main>
		</>
	);
};

export default Layout;
