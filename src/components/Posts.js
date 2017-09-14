import React, { Component } from "react";
import * as AppCss from "./AppCss.js";

class Posts extends Component {
  render() {
    return (
      <div style={AppCss.postagens}>
        <div className="postagens">
          {this.props.posts.map(x => (
            <div className="post" style={AppCss.postsIndividuais}>
              <div style={AppCss.titulo}>{x.Titulo}</div>
              <div>{x.Autor}</div>
              <div style={AppCss.like}>{x.Like}</div>
            </div>
          ))}
          <div style={AppCss.Novo}>+</div>
        </div>
      </div>
    );
  }
}

export default Posts;