import React, { Component } from "react";
import * as AppCss from "../../style/PostsCss.js";
import * as Map from "../Maps.js";
import HeaderPost from "./HeaderPost.js";
import Comments from "../Comments/CommentsView.js";
import { connect } from "react-redux";
import { Button, Panel, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import IconTrash from "react-icons/lib/md/delete";
import Heart from "react-icons/lib/ti/heart-full-outline";
import Like from "react-icons/lib/ti/thumbs-up";
import NotLike from "react-icons/lib/ti/thumbs-down";
import BotaoEditar from "react-icons/lib/ti/pencil";
import * as PostsCss from "../../style/PostsCss.js";
import sortBy from "sort-by";

class FullPost extends Component {
  popoverHoverFocus = mensagem => (
    <Popover id="popover-trigger-hover-focus">
      <strong>{mensagem}</strong>
    </Popover>
  );

  componentDidMount = () => {
    this.props.getFullPost(this.props.posts, this.props.id);
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
              <div style={{ marginTop: "20px" }}>
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="bottom"
                  overlay={this.popoverHoverFocus("Editar Post")}
                >
                  <Link to="#">
                    <BotaoEditar
                      size={"40px"}
                      onClick={() => this.props.abrirModal()}
                    />
                  </Link>
                </OverlayTrigger>

                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="bottom"
                  overlay={this.popoverHoverFocus(
                    "Remover Post"
                  )}
                >
                  <Link className="close-search" to="/">
                    <IconTrash
                      size={"40px"}
                      onClick={() =>
                        this.props.deletPost(
                          this.props.posts,
                          this.props.postUnico.id
                        )}
                      style={{ color: "red", marginLeft: "30px" }}
                    />
                  </Link>
                </OverlayTrigger>
              </div>
              <div className="votacao" style={{ textAlign: "right" }}>
                <Link to="#">
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={this.popoverHoverFocus("+3 pontos!")}
                  >
                    <Heart
                      className="Loved"
                      onClick={() =>
                        this.props.votePost(
                          this.props.postUnico.id,
                          "loved",
                          this.props.posts
                        )}
                      size={"20px"}
                      style={{ color: "red" }}
                    />
                  </OverlayTrigger>
                </Link>
                <Link to="#">
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={this.popoverHoverFocus("+1 ponto!")}
                  >
                    <Like
                      onClick={() =>
                        this.props.votePost(
                          this.props.postUnico.id,
                          "upVote",
                          this.props.posts
                        )}
                      size={"20px"}
                      style={{ margin: "15px" }}
                    />
                  </OverlayTrigger>
                </Link>
                <Link to="#">
                  <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="bottom"
                    overlay={this.popoverHoverFocus("-1 ponto!")}
                  >
                    <NotLike
                      onClick={() =>
                        this.props.votePost(
                          this.props.postUnico.id,
                          "downVote",
                          this.props.posts
                        )}
                      size={"20px"}
                    />
                  </OverlayTrigger>
                </Link>
              </div>
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
