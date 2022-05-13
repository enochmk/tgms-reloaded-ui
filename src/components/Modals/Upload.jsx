import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InfoModal({ open, setOpen }) {
	const [show, setShow] = useState(open);
	const navigate = useNavigate();
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

	const handleClose = () => {
		setOpen(false);
		navigate('/');
	};

	useEffect(() => {
		setShow(open);
	}, [open]);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className='text-center'>
					<Modal.Title>Load File</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit}>
					<Modal.Body>
						<div className='card-body'>
							<div className='my-3'>
								<div class='mb-3'>
									<label for='formFile' class='form-label'>
										File upload:
									</label>
									<input
										type='file'
										class='form-control'
										ref={ref}
										onChange={handleChange}
										required
										disabled={isFileUploading}
									/>
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button
							type='submit'
							className='btn btn-success'
							disabled={isFileUploading}>
							{isFileUploading ? (
								<span className='spinner-border spinner-border-sm'></span>
							) : null}
							{isFileUploading ? ' Uploading...' : 'Upload'}
						</button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}
