import React from 'react'
import { Navbar, MenuItem, Nav, NavDropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import { withRouter } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

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
          <Link className="main" to="/">
            Fala aí!
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={1} title="Categorias" id="basic-nav-dropdown">
            {props.categorias.map((categoria, index) => (
              <LinkContainer
                to={`/${categoria.path}`}
                key={categoria.path}>
                <MenuItem
                  eventKey={1 + ((index + 1) / 10)} >
                  {categoria.name}
                </MenuItem>
              </LinkContainer>
            ))}
          </NavDropdown>
          <NavDropdown
            eventKey={2}
            title="Ordenar" id="basic-nav-dropdown">
            {ordenar.map((x, index) => (
              <MenuItem
                key={x.sort}
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

export default withRouter(
  connect(mapStateToProps)(Menu)
);