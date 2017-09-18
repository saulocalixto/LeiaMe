import React, { Component } from "react";
import * as AppCss from "../style/PostsCss.js";
import connect from './App.js'
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Posts extends Component {
  render() {
    console.log(this.store)
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
          <div>
            <Button bsStyle="primary" onClick={this.props.abrirModal}>Novo Post</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
