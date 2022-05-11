import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<aside className='sidenav navbar navbar-vertical navbar-expand-xs bg-gradient-dark'>
			<section className='d-flex justify-content-center align-items-center py-4'>
				<span className='ms-1 font-weight-bold text-white'>
					Tugomesu Reloaded 2
				</span>
			</section>
			<hr className='horizontal light mt-0 mb-2' />
			<section
				className='collapse navbar-collapse w-auto max-height-vh-100'
				id='sidenav-collapse-main'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<Link className='nav-link text-white' to='/'>
							<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
								<i className='material-icons opacity-10'>dashboard</i>
							</div>
							<span className='nav-link-text ms-1'>Home</span>
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link text-white' to='/randomizer'>
							<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
								<i className='material-icons opacity-10'>table_view</i>
							</div>
							<span className='nav-link-text ms-1'>Randomizer</span>
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link text-white' to='/loader'>
							<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
								<i className='material-icons opacity-10'>receipt_long</i>
							</div>
							<span className='nav-link-text ms-1'>Loader</span>
						</Link>
					</li>
				</ul>
			</section>
		</aside>
	);
}

export default Sidebar;
