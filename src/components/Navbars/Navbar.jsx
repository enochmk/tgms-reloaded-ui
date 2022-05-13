import React from 'react';
import {
	DropdownMenu,
	DropdownItem,
	Dropdown,
	Navbar,
	Nav,
	Container,
} from 'reactstrap';

function CustomNavbar(props) {
	return (
		<>
			<Navbar
				className='navbar-top fixed-top py-4  navbar-bg-transparent'
				expand='md'
				id='navbar-main'>
				<Container fluid>
					<p className='h4 mb-0 text-white text-uppercase d-none d-lg-inline-block'>
						{props.brandText}
					</p>
					<Nav className='align-items-center d-none d-md-flex' navbar>
						<Dropdown nav>
							<DropdownMenu className='dropdown-menu-arrow' right>
								<DropdownItem href='#pablo' onClick={(e) => e.preventDefault()}>
									<i className='ni ni-user-run' />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default CustomNavbar;
