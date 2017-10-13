import React from 'react'
import { Navbar, MenuItem, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";

const ordenar = [
  {
    tipo: "Quantidade de comentários",
    sort: "qtdComments"
  },
  {
    tipo: "Categoria",
    sort: "category"
  },
  {
    tipo: "Mais Votos",
    sort: "voteScore"
  },
  {
    tipo: "Mais Recente",
    sort: "timestamp"
  },
  {
    tipo: "Título",
    sort: "titulo"
  },
  {
    tipo: "Autor",
    sort: "autor"
  }
].sort(sortBy("tipo"));

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
              <MenuItem
                eventKey={1 + ((index + 1) / 10)}
                href={`/${categoria.path}`}
                key={index}>
                {categoria.name}
              </MenuItem>
            ))}
          </NavDropdown>
          <NavDropdown
            eventKey={2}
            title="Ordenar" id="basic-nav-dropdown">
            {ordenar.map((x, index) => (
              <MenuItem
                key={index}
                eventKey={1 + ((index + 1) / 10)}
                onClick={() => props.tipoSort(x.sort)}>
                {x.tipo}
              </MenuItem>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export const mapStateToProps = (store) => {
  const categorias = store.categorias
  return {
    ...categorias,
  }
}

export default connect(mapStateToProps)(Menu);