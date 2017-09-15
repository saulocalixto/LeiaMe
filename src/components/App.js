import React, { Component } from "react";
import * as AppCss from "../style/AppCss.js";
import Posts from "./Posts.js";
import categories from '../api-server/categories.js'

let posts = [
  {
    Titulo: "Todas as vacas estão mortas!",
    Autor: "Saulo Calixto",
    Like: 10
  },
  {
    Titulo: "Título n. 2",
    Autor: "Guilberto Berto",
    Like: 10
  },
  {
    Titulo: "Título n.3",
    Autor: "Beltrano da Silva",
    Like: 10
  }
];

class App extends Component {

  state = {
    categorias: []
  }

  token = fetch( {
    headers: { Authorization: "Saulo Calixto" }
  });

  componentDidMount() {
    categories.getAll(this.token).then((categorias) => {
      categorias = categorias.categories;
      this.setState({ categorias })
    });
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
        <Posts posts={posts} />
        <div style={AppCss.linhaRodaPe} />
        <div className="rodaPe" style={AppCss.textoRodape}>
          Copyright Calixto's WebPage
        </div>
      </div>
    );
  }
}

export default App;
