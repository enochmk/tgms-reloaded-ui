import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Container,
  NavItem,
  Button,
} from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';

function CustomNavbar() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    userContext.setIsLoggedIn(false);
    userContext.setToken(null);
    userContext.setUser(null);

    navigate('/login');
  };

  return (
    <Navbar
      className="navbar-top py-4 bg-light mb-4"
      expand="md"
      id="navbar-main"
    >
      <Container fluid>
        <NavbarBrand>
          <span className="">
            <img alt="Logo" src={require('../../assets/img/brand/logo.png')} />
          </span>
        </NavbarBrand>
        <Nav className="align-items-end d-none d-md-flex" navbar>
          <NavItem>
            <NavLink tag={Link} to="/" className="active">
              <i className="ni ni-tv-2 text-primary mr-2" />
              HOME
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/draw" className="active">
              <i className="ni ni-bullet-list-67 text-red mr-2" />
              DRAW
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/winners" className="active">
              <i className="ni ni-trophy text-primary mr-2" />
              WINNERS
            </NavLink>
          </NavItem>
          <NavItem>
            <Button
              className="btn btn-link btn-outline-warning"
              onClick={handleLogout}
            >
              <i className="ni ni-user-run text-danger mr-2" />
              LOGOUT
            </Button>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
