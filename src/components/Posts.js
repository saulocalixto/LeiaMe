import React, { Component } from "react";
import * as AppCss from "../style/PostsCss.js";

class Posts extends Component {
  render() {
    return (
      <div style={AppCss.postagens}>
        <div className="postagens">
          {this.props.posts.map(x => (
            <div className="post" style={AppCss.postsIndividuais}>
              <div style={AppCss.titulo}>{x.title}</div>
              <div>{x.author}</div>
              <div style={AppCss.like}>{x.voteScore}</div>
            </div>
          ))}
          <div style={AppCss.Novo}></div>
        </div>
      </div>
    );
  }
}

export default Posts;
