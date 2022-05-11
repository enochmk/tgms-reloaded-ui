import React from 'react';

function Navbar() {
	return (
		<nav
			className='navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl'
			navbar-scroll='true'>
			<div className='container-fluid py-1 px-3'>
				<h6 className='font-weight-bolder mb-0'>Home</h6>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav justify-content-end'></ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
