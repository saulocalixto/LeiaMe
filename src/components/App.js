import React, { Component } from "react";
import * as AppCss from "./AppCss.js";

const categorias = [
  "Todos",
  "Arquitetura de Software",
  "Engenharia de Software",
  "Desenvolvimento",
  "Métodos de Desenvolvimento"
];

class App extends Component {
  render() {
    console.log(AppCss);
    return (
      <div className="wrap">
        <div className="cabeçalho" style={AppCss.barraMenuStylus}>
          Ninguém Liga para o que você pensa, mas... Fala aí!
          <div className="barra" />
          <div className="categoriasMenu" style={AppCss.selecionaCategoria}>
            <select name="categoria" value="categoria" style={AppCss.select}>
              {categorias.map((categoria, indice) => (
                <option key={indice}>{categoria}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={AppCss.postagens}>
          <div className="postagens">
            <div className="post" style={AppCss.postsIndividuais}>
              <div>Título do Post</div>
              <div>Autor do Post</div>
              <div>Likes</div>
            </div>
            <div className="post" style={AppCss.postsIndividuais}>
              <div>Título do Post</div>
              <div>Autor do Post</div>
              <div style={AppCss.like}>Likes</div>
            </div>
            <div className="post" style={AppCss.postsIndividuais}>
              <div>Título do Post</div>
              <div>Autor do Post</div>
              <div>Likes</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
