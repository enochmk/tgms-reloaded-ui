import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
} from 'reactstrap';

function Upload() {
  const [modal, setModal] = useState(false);
  const ref = useRef();
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileUploadData, setFileUploadData] = useState(null);

  const toggle = () => setModal(!modal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info('Uploading file...');
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
      setMessage('File uploaded successfully!');
      toast.success('File uploaded successfully!');

      setIsError(false);
      handleSet();
    } catch (error) {
      setIsError(true);

      if (error.response.data?.message) {
        setMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setMessage(error.message);
        toast.error(error.message);
      }
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
    <Container fluid className="d-flex justify-content-center mt-5">
      <Button color="primary" onClick={toggle} size="lg">
        Loader
      </Button>
      <Modal isOpen={modal}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>File Upload</ModalHeader>
          <ModalBody>
            <div className="p-4">
              {message && (
                <Alert color={isError ? 'danger' : 'success'}>{message}</Alert>
              )}
              <label className="form-label">
                Select file: {selectedFile?.name}
              </label>
              <div className="input-group input-group-outline mb-4">
                <input
                  type="file"
                  ref={ref}
                  className="form-control"
                  onChange={handleChange}
                  required
                  disabled={isFileUploading}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-success">
              {isFileUploading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : null}
              {isFileUploading ? ' Uploading...' : 'Upload'}
            </button>
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    </Container>
  );
}

export default Upload;
