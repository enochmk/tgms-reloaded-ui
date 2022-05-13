import { Link } from 'react-router-dom';

// reactstrap components
import {
	Collapse,
	Navbar,
	NavbarBrand,
	NavItem,
	NavLink,
	Nav,
	Container,
} from 'reactstrap';

const Sidebar = ({ routes }) => {
	const createLinks = (routes) => {
		return routes.map((prop, key) => {
			return (
				<Link to={prop.path} key={key}>
					<NavItem>
						<NavLink className='active'>
							<i className={prop.icon} />
							{prop.name}
						</NavLink>
					</NavItem>
				</Link>
			);
		});
	};

	return (
		<Navbar
			className='navbar-vertical fixed-left navbar-light bg-white'
			expand='md'
			id='sidenav-main'>
			<Container fluid>
				<NavbarBrand className='p-1'>
					<h2>Togumeso 2</h2>
				</NavbarBrand>
				<hr className='dropdown-divider' />
				<Collapse navbar>
					<Nav navbar>{createLinks(routes)}</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

export default Sidebar;
