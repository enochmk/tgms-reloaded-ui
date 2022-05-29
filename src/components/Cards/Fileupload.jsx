import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Alert,
} from 'reactstrap';

function Fileupload({ setStatistics, setIsLoading }) {
  const ref = useRef();
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
        url: 'http://localhost:8000/api/tgms2/loader',
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
    <Container fluid className="justify-content-center">
      <div className="mt-4 p-5 text-white rounded text-center">
        <form onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col md={4}>
              <Card>
                <CardTitle>
                  <h2 className="display-4 mt-2">File Upload</h2>
                </CardTitle>
                <CardSubtitle>
                  <p className="lead text-muted">
                    Upload a file containning list of numbers.
                  </p>
                </CardSubtitle>
                <CardBody>
                  {message && (
                    <Alert color={isError ? 'danger' : 'success'}>
                      {message}
                    </Alert>
                  )}
                  <label className="form-label">Upload a file:</label>
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
                  <Button className="btn-block btn-success">Upload</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default Fileupload;
