import { useState, useContext } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';
import userAuthenticationService from '../services/userLogin';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await userAuthenticationService(username, password);
      userContext.setUser(result.user);
      userContext.setToken(result.accessToken);
      userContext.setIsLoggedIn(true);

      localStorage.setItem('token', result.accessToken);
      localStorage.setItem('user', result.user);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        return;
      }

      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent py-3 text-center">
            <h4>Enter credentials</h4>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <span className="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </span>
                  <Input
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <span className="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </span>
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4 btn btn-block btn-danger bg-airteltigo-danger text-white"
                  type="submit"
                  disabled={loading}
                >
                  Sign in {loading && <i className="fas fa-spinner fa-spin" />}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
