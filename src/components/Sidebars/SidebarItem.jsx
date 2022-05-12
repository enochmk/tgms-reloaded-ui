import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SidebarItem({ title, link, icon }) {
	const location = useLocation();
	const pathName = location.pathname;

	return (
		<li className='nav-item'>
			<Link
				className={
					pathName === link
						? 'nav-link text-white active'
						: 'nav-link text-white'
				}
				to={link}>
				<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
					<i className='material-icons opacity-10'>{icon}</i>
				</div>
				<span className='nav-link-text ms-1'>{title}</span>
			</Link>
		</li>
	);
}

export default SidebarItem;
