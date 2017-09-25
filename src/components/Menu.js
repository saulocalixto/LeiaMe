import React from 'react'
import {Navbar, MenuItem, Nav, NavDropdown} from 'react-bootstrap';
import * as Map from "./Maps.js";
import { connect } from "react-redux";

const ordenar= [
  {
    tipo: "Título"
  },
  {
    tipo: "Quantidade de comentários"
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
        <a href="#">Fala aí!</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={1} title="Categorias" id="basic-nav-dropdown">
          {props.categorias.map((categoria, index) => (
            <MenuItem eventKey={1 + ((index + 1)/10) }>{categoria.name}</MenuItem>
          ))}
        </NavDropdown>
        <NavDropdown eventKey={2} title="Ordenar" id="basic-nav-dropdown">
          {ordenar.map((x, index) => (
            <MenuItem eventKey={1 + ((index + 1)/10) }>{x.tipo}</MenuItem>
          ))}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(Menu);