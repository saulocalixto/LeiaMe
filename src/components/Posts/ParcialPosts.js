import React, { Component } from "react";
import * as AppCss from "../../style/PostsCss.js";
import * as Map from "../Maps.js";
import HeaderPost from "./HeaderPost.js";
import { connect } from "react-redux";
import { Button, Panel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { If, Then, Else } from "react-if";

class ParcialPosts extends Component {
  componentDidMount = () => {
    this.props.posts.map(post => {
      return this.props.getAllComments(post.id, post);
    });
  };

  render() {
    const { filtro, posts } = this.props;
    return (
      <div style={AppCss.postagens}>
        <div style={AppCss.Botao}>
          <Button bsStyle="primary" onClick={this.props.abrirModal}>
            Novo Post
          </Button>
        </div>
        <If
          condition={
            posts.filter(
              x => (filtro ? x.category === filtro : x.category !== null)
            ).length !== 0
          }
        >
          <Then>
            <div>
              {posts
                .filter(
                  x => (filtro ? x.category === filtro : x.category !== null)
                )
                .map((x, index) => (
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
                        onClick={() => this.props.setId(x.id)}
                      >
                        Abrir
                      </Button>
                    </Link>
                  </Panel>
                ))}
            </div>
          </Then>
          <Else>
            <div style={AppCss.mensagem}>Seja o primeiro a compartilhar...</div>
          </Else>
        </If>
      </div>
    );
  }
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(
  ParcialPosts
);
