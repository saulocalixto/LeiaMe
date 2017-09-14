import React, { Component } from "react";
import * as AppCss from "./AppCss.js";
import Posts from './Posts.js'

const categorias = [
  "Todos",
  "Arquitetura de Software",
  "Engenharia de Software",
  "Desenvolvimento",
  "Métodos de Desenvolvimento"
];

let posts = [
  {
    Titulo: 'Todas as vacas estão mortas!',
    Autor: 'Saulo Calixto',
    Like: 10
  },
  {
    Titulo: 'Título n. 2',
    Autor: 'Guilberto Berto',
    Like: 10
  },
  {
    Titulo: 'Título n.3',
    Autor: 'Beltrano da Silva',
    Like: 10
  }
]

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
        <Posts posts={posts} />
        <div style={AppCss.linhaRodaPe}></div>
          <div className='rodaPe' style={AppCss.textoRodape}>Copyright Calixto's WebPage</div>
      </div>
    );
  }
}

export default App;
