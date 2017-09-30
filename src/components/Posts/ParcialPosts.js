import React, { Component } from "react";
import * as AppCss from "../../style/PostsCss.js";
import * as Map from "../Maps.js";
import HeaderPost from "./HeaderPost.js";
import { connect } from "react-redux";
import { Button, Panel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { If, Then, Else } from "react-if";
// import IconTrash from 'react-icons/lib/md/delete'
// import iconRain from 'react-icons/lib/md/flash-on'

class ParcialPosts extends Component {
  render() {
    console.log(this.props.posts);
    return (
      <div style={AppCss.postagens}>
        <div style={AppCss.Botao}>
          <Button bsStyle="primary" onClick={this.props.abrirModal}>
            Novo Post
          </Button>
        </div>
        {console.log(this.props.posts.length)}
        <If condition={ this.props.posts != 0 }>
          <Then>
            <div>
            {this.props.posts.map((x, index) => (
              <Panel
                header={`${x.title} || Por: ${x.author}`}
                bsStyle="primary"
                key={x.id}
                value={x.id}
                style={AppCss.Painel}
                eventKey={index + 1}
              >
                <HeaderPost post={x} />
                <Link className="close-search" to={`/post/${x.id}`}>
                  <Button
                    value={x.id}
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.props.setId}
                  >
                    Abrir
                  </Button>
                </Link>
              </Panel>
            ))}
            </div>
          </Then>
          <Else><div style={AppCss.mensagem}>Seja o primeiro a escrever alguma coisa...</div></Else>
        </If>
      </div>
    );
  }
}
export default ParcialPosts;
