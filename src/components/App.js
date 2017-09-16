import React, { Component } from "react";
import * as AppCss from "../style/AppCss.js";
import Posts from "./Posts.js";
import * as ApiCategorias from '../api/ApiCategorias.js'
import * as ApiPosts from '../api/ApiPosts.js'

class App extends Component {

  state = {
    categorias: [],
    posts: []
  }

  token = fetch( {
    headers: { Authorization: "Saulo Calixto" }
  });

  componentDidMount() {
    
    ApiCategorias.getAllCategories().then((categorias) => {
      this.setState({ categorias })
    }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
    
    ApiPosts.getAllPosts().then((posts) => {
      this.setState({ posts })
    }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
  }


  render() {
    console.log(AppCss);
    return (
      <div className="wrap">
        <div className="cabeçalho" style={AppCss.barraMenuStylus}>
          Ninguém Liga para o que você pensa, mas... Fala aí!
          <div className="barra" />
          <div className="categoriasMenu" style={AppCss.selecionaCategoria}>
            <select name="categoria" value="categoria" style={AppCss.select}>
              {this.state.categorias.map((categoria, indice) => (
                <option key={indice}>{categoria.name}</option>
              ))}
            </select>
          </div>
        </div>
        <Posts posts={this.state.posts} />
        <div style={AppCss.linhaRodaPe} />
        <div className="rodaPe" style={AppCss.textoRodape}>
          Copyright Calixto's WebPage
        </div>
      </div>
    );
  }
}

export default App;
