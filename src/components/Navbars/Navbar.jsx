import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Container,
  NavItem,
} from 'reactstrap';

function CustomNavbar(props) {
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
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
