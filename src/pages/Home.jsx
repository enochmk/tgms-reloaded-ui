import React, { useState } from 'react';
import Upload from '../components/Modals/Upload';

function Home() {
	const [open, setOpen] = useState(false);

	return (
		<section className='container-fluid text-center w-100 flex-grow-1'>
			<div className='row'>
				<div className='col-8'></div>
				<div className='col-4'>
					<div className='row'>
						<div className='col-md-12 mb-4'>
							<div className='card mt-4'>
								<div className='card-header pb-0 p-3'>
									<div className='row py-4'>
										<div className='col-6 d-flex align-items-center'>
											<h6 className='mb-0'>File uploader: </h6>
										</div>
										<div className='col-6 text-end'>
											<button
												className='btn bg-gradient-dark mb-0'
												onClick={() => setOpen(true)}>
												<i className='material-icons text-sm mr-2'>upload </i>
												Choose file
											</button>
											<Upload open={open} setOpen={setOpen} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Home;
