import React from 'react';

function Footer() {
	return (
		<footer className='footer col-8 w-100 container-fluid py-4'>
			<div className='row align-items-center justify-content-lg-between'>
				<hr className='mb-4 border-b-1' />
				<section className='col-lg-6'>
					<div className='copyright text-center text-sm text-muted text-lg-start'>
						Copyright © 2022 AirtelTigo
					</div>
				</section>

				<section className='col-lg-6'>
					<ul className='nav nav-footer justify-content-center justify-content-lg-end'>
						<li>
							<span className='text-600 text-sm'>Solutions Team</span>
						</li>
						<li>
							<a
								href='https://www.airteltigo.com.gh/home'
								target='_blank'
								className='text-600 text-sm block py-1 px-3'
								rel='noreferrer'>
								About Us
							</a>
						</li>
					</ul>
				</section>
			</div>
		</footer>
	);
}

export default Footer;
