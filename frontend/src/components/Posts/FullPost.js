import React, { Component } from "react";
import * as AppCss from "../../style/PostsCss.js";
import * as Map from "../Maps.js";
import HeaderPost from "./HeaderPost.js";
import Comments from "../Comments/CommentsView.js";
import { connect } from "react-redux";
import { Button, Panel, Popover } from "react-bootstrap";
import * as PostsCss from "../../style/PostsCss.js";
import Votacao from "./Votacao.js";
import BotoesControle from "./BotoesControle.js";

class FullPost extends Component {
  popoverHoverFocus = mensagem => (
    <Popover id="popover-trigger-hover-focus">
      <strong>{mensagem}</strong>
    </Popover>
  );

  componentDidMount = () => {
    this.props.getAllComments(this.props.postUnico.id, this.props.postUnico);
  };

  render() {
    return (
      <div style={{ ...AppCss.postagens, width: "600px" }}>
        {this.props.loadingComentarios ? (
          <div style={PostsCss.mensagem}>Loading...</div>
        ) : (
            <div>
              <Panel
                header={`${this.props.postUnico.title} || Por: ${this.props
                  .postUnico.author}`}
                bsStyle="primary"
                key={this.props.postUnico.id}
                value={this.props.postUnico.id}
                style={AppCss.Painel}
                eventKey={1}
              >
                <HeaderPost
                  post={this.props.postUnico}
                  qtdComentarios={this.props.comentarios.length}
                />
                <div style={{ textAlign: "justify" }}>
                  <p> {this.props.postUnico.body}</p>{" "}
                </div>
                <BotoesControle
                  postUnico={this.props.postUnico}
                  abrirModal={this.props.abrirModalEditar} />
                <Votacao postUnico={this.props.postUnico} />
              </Panel>
              <div style={AppCss.postagens}>
                <Button onClick={() => this.props.open()}>Comentários</Button>
                <Panel collapsible expanded={this.props.show}>
                  <Comments
                    popoverHoverFocus={this.popoverHoverFocus}
                    parentId={this.props.postUnico.id}
                    style={{ position: "absolute" }}
                    post={this.props.postUnico}
                  />
                </Panel>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = store => {
  const posts = store.posts["posts"];
  const comentarios = store.comentarios;
  return {
    posts,
    ...comentarios
  };
};

export default connect(mapStateToProps, Map.mapDispatchToProps)(FullPost);
