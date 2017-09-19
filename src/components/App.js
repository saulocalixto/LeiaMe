import React, { Component } from "react";
import * as AppCss from "../style/AppCss.js";
import Posts from "./Posts.js";
import NovoPost from "./NovoPost.js";
import * as ApiCategorias from "../api/ApiCategorias.js";
import * as ApiPosts from "../api/ApiPosts.js";
import * as Map from "./Maps.js";
import ModalComponent from "./Modal.js";
import { connect } from "react-redux";
import { fetchPosts, fetchCategorias } from "../actions";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    categorias: [],
    posts: [],
    showModal: false
  };

  guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  componentWillMount() {
    this.props.allPosts();
    this.props.allCategorias();
  }

  componentDidMount() {
    // ApiCategorias.getAllCategories().then((categorias) => {
    //   this.setState({ categorias })
    // }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
    // ApiPosts.getAllPosts().then((posts) => {
    //   this.setState({ posts })
    // }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  Submit = event => {
    const formulario = event.target;
    const title = formulario["idTitulo"].value;
    const author = formulario["idAutor"].value;
    const body = formulario["idTextoPost"].value;
    const category = formulario["idCategoria"].value;

    const posts = {
      id: this.guid(),
      timestamp: (Date.now() / 1000) | 0,
      title,
      body,
      author,
      category,
      voteScore: 0,
      deleted: false
    };

    ApiPosts.addPost(...posts).then(posts => {
      console.log(posts);
    });
  };

  render() {
    return (
      <div className="wrap">
        <div className="cabeçalho" style={AppCss.barraMenuStylus}>
          Ninguém Liga para o que você pensa, mas... Fala aí!
          <div className="barra" />
          <div className="categoriasMenu" style={AppCss.selecionaCategoria}>
            <select name="categoria" value="categoria" style={AppCss.select}>
              {this.props.categorias.map((categoria, indice) => (
                <option key={indice}>{categoria.name}</option>
              ))}
            </select>
          </div>
        </div>
        <Route exact path="/" render={() => <Posts abrirModal={this.open} />} />
        <div style={AppCss.linhaRodaPe}>
          <div className="rodaPe" style={AppCss.textoRodape}>
            Copyright Calixto's WebPage
          </div>
        </div>
        <ModalComponent
          show={this.state.showModal}
          close={this.close}
          component={<NovoPost submit={this.Submit} />}
        />
      </div>
    );
  }
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(App);
