import React, { Component } from "react";
import * as AppCss from "../style/PostsCss.js";
import * as Map from "./Maps.js";
import HeaderPost from "./HeaderPost.js"
import { connect } from "react-redux";
import { Button, Panel, Accordion, Label, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import App from "./App.js";
import IconTrash from 'react-icons/lib/md/delete'
import iconRain from 'react-icons/lib/md/flash-on'

class ParcialPosts extends Component {
  render() {
    return (
      <div style={AppCss.postagens}>
        <div style={AppCss.Botao}>
          <Button bsStyle="primary" onClick={this.props.abrirModal}>
            Novo Post
          </Button>
        </div>
        {this.props.posts.map((x, index) => (
          <Panel
            header={`${x.title} || Por: ${x.author}`}
            bsStyle="primary"
            key={x.id}
            value={x.id}
            style={AppCss.Painel}
            eventKey={index + 1}>
              <HeaderPost post={x} />
              <Link className="close-search" to={`/post/${x.id}`}>
              <Button
                  value={x.id}
                  bsStyle="primary"
                  bsSize="small"
                  onClick={this.props.setId}>
                  Abrir
              </Button>
              </Link>
          </Panel>
        ))}
      </div>
    );
  }
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(ParcialPosts);
