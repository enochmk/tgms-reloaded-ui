import { useState, useRef } from 'react';
import axios from 'axios';

function Loader() {
	const ref = useRef();
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [isFileUploading, setIsFileUploading] = useState(false);
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const [fileUploadData, setFileUploadData] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsFileUploading(true);

		const data = new FormData();
		data.append('file', selectedFile);

		try {
			const config = {
				method: 'post',
				url: 'http://10.81.9.68:8000/api/tgms2/loader',
				headers: { 'Content-Type': 'multipart/form-data' },
				data: data,
			};

			const response = await axios(config);
			setFileUploadData(response.data);
			setIsFileUploaded(true);
			handleSet();
		} catch (error) {
			console.error(error);
		} finally {
			setIsFileUploading(false);
		}
	};

	const handleChange = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSet = () => {
		ref.current.value = '';
		setSelectedFile(null);
	};

	return (
		<section className='container-fluid w-100 flex-grow-1 d-flex justify-content-center align-items-center p-5'>
			<div className='card w-50'>
				<div className='card-header p-3 pt-2'>
					<div className='icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute'>
						<i className='material-icons opacity-10'>upload</i>
					</div>
					<div className='text-end pt-1 p-3'>
						<p className='text-sm mb-0 text-capitalize'>Upload File</p>
					</div>
				</div>
				<hr className='dark horizontal my-0' />
				<form onSubmit={handleSubmit}>
					<div className='card-body'>
						<div className='p-4'>
							<label className='form-label'>
								Select file: {selectedFile?.name}
							</label>
							<div className='input-group input-group-outline mb-4'>
								<input
									type='file'
									ref={ref}
									className='form-control'
									onChange={handleChange}
									required
									disabled={isFileUploading}
								/>
							</div>
						</div>
					</div>
					<div className='card-footer p-3'>
						<p className='mb-0 d-flex justify-content-end'>
							<button
								type='submit'
								className='btn btn-success'
								disabled={isFileUploading}>
								{isFileUploading ? (
									<span className='spinner-border spinner-border-sm'></span>
								) : null}
								{isFileUploading ? ' Uploading...' : 'Upload'}
							</button>
						</p>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Loader;
