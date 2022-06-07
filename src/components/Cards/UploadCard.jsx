import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Alert } from 'reactstrap';

function Fileupload({ setStatistics, setIsLoading }) {
  const ref = useRef();
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  async function sleep(ms) {
    new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.info('Uploading file...');
    setIsFileUploading(true);
    setIsLoading(true);

    const data = new FormData();
    data.append('file', selectedFile);

    await sleep(2000);

    try {
      const config = {
        method: 'post',
        url: 'https://10.81.9.68:9000/api/tgms2/loader',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: data,
      };

      const response = await axios(config);
      setStatistics(response.data);
      setMessage('File uploaded successfully!');
      toast.success('File uploaded successfully!');
      setIsError(false);
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
      setIsLoading(false);
      setIsFileUploading(false);
    }
  };

  return (
    <div className="container d-flex w-50 h-100 mt-5 flex-column">
      <div className="justify-content-center align-content-center">
        <form onSubmit={handleSubmit}>
          <label className="form-label text-white">Upload a file: </label>
          <Card>
            <CardBody>
              {message && (
                <Alert color={isError ? 'danger' : 'success'}>{message}</Alert>
              )}
              <div className="row">
                <div className="col-md-9">
                  <div className="input-group input-group-outline">
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
                <span className="col-md-3">
                  <Button className="btn-secondary">Upload</Button>
                </span>
              </div>
            </CardBody>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default Fileupload;
