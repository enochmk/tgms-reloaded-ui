import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Alert,
  Modal,
  Badge,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  Fade,
  CardText,
} from 'reactstrap';

function Randomizer() {
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [winners, setWinners] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => {
    setMessage(null);
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setWinners(null);

    try {
      const config = {
        method: 'get',
        url: `http://localhost:8000/api/tgms2/randomizer?count=${count}`,
      };

      const response = await axios(config);

      setWinners(response.data);
      setMessage('Winner generated successfully!');
      toast.success('Winner generated successfully!');
      setIsError(false);
      setCount(0);
      toggle();
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
    }
  };

  const handleChange = (e) => {
    setCount(e.target.value);
  };

  return (
    <>
      <div className="header bg-gradient-danger py-8 pt-5">
        <Container fluid className="header-body justify-content-center">
          <div className="mt-4 p-5 text-white rounded text-center">
            <h1 className="text-white">Randomizer</h1>
            <p className="lead">Click Generate and enter number of winners.</p>
            <Button color="primary" onClick={toggle} size="lg">
              Generate
            </Button>
            <Modal isOpen={modal}>
              <form onSubmit={handleSubmit}>
                <ModalHeader toggle={toggle}>Generate Winner</ModalHeader>
                <ModalBody>
                  <div className="p-4">
                    {message && (
                      <Alert color={isError ? 'danger' : 'success'}>
                        {message}
                      </Alert>
                    )}
                    <label className="form-label">Number of Winners: </label>
                    <div className="input-group input-group-outline mb-4">
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        value={count}
                        required
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button type="submit" className="btn btn-success">
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : null}
                    {isLoading ? ' Generating...' : 'Generate'}
                  </button>
                  <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </form>
            </Modal>
          </div>
        </Container>
      </div>
      <Container className="justify-content-center align-items-center text-center py-2 mb-5">
        {winners?.length ? (
          <Row>
            {winners.map((winner, index) => (
              <Col size="4" className="m-1 shadow-lg" key={index}>
                <Fade>
                  <Card body>
                    <CardTitle tag="h5">
                      <span className="text-success">WINNER</span>
                      <Badge
                        color="success"
                        size="md"
                        className="text-white mx-2 justify-content-end"
                      >
                        {index + 1}
                      </Badge>
                    </CardTitle>
                    <CardText>
                      <p className="display-1">0{winner}</p>
                    </CardText>
                  </Card>
                </Fade>
              </Col>
            ))}
          </Row>
        ) : null}
      </Container>
    </>
  );
}

export default Randomizer;
