import React from 'react'
import { Navbar, MenuItem, Nav, NavDropdown } from 'react-bootstrap';
import * as Map from "./Maps.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ordenar = [
  {
    tipo: "Quantidade de comentários"
  },
  {
    tipo: "Título"
  },
  {
    tipo: "Votos"
  }
]

const Menu = (props) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link className="close-search" to="/">
            Fala aí!
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={1} title="Categorias" id="basic-nav-dropdown">
            {props.categorias.map((categoria, index) => (
              <MenuItem eventKey={1 + ((index + 1) / 10)} href={categoria.path}>{categoria.name}</MenuItem>
            ))}
          </NavDropdown>
          <NavDropdown eventKey={2} title="Ordenar" id="basic-nav-dropdown">
            {ordenar.map((x, index) => (
              <MenuItem eventKey={1 + ((index + 1) / 10)}>{x.tipo}</MenuItem>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(Menu);