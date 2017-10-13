import React, { Component } from "react";
import * as PostsCss from "../style/PostsCss.js";
import NovoPost from "./Posts/NovoPost.js";
import * as Map from "./Maps.js";
import ModalComponent from "./Modal.js";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Menu from "./Menu.js";
import { withRouter } from "react-router-dom";
import ParcialPosts from "./Posts/ParcialPosts.js";
import FullPost from "./Posts/FullPost.js";

class App extends Component {
  state = {
    sort: "voteScore",
    id: "",
    showModalNovo: false,
    showModalEditar: false,
    showComments: false
  };

  tipoSort = sort => {
    this.props.ordenaPosts(this.props.posts, sort);
  };

  componentDidMount() {
    this.props.allPosts();
    this.props.allCategorias();
  }

  close = () => {
    this.setState({ showModalNovo: false });
    this.setState({ showModalEditar: false });
  };

  openNovo = () => {
    this.setState({ showModalNovo: true });
  };

  openEditar = () => {
    this.setState({ showModalEditar: true });
  };

  openComment = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    const { posts, loading, categorias } = this.props;
    return (
      <div className="wrap">
        <Menu tipoSort={this.tipoSort} />
        {loading || categorias.length === 0 ? (
          <div style={PostsCss.mensagem}>Loading...</div>
        ) : (
            <div className='conteudo'>
              <Route
                exact
                path="/"
                render={() => (
                  <ParcialPosts posts={posts} abrirModalNovo={this.openNovo} abrirModalEditar={this.openEditar} />
                )}
              />

              {categorias.map(categoria => (
                <Route
                  key={categoria.path}
                  exact
                  path={`/${categoria.path}`}
                  render={() => (
                    <ParcialPosts
                      filtro={categoria.name}
                      posts={posts.filter(
                        post => post.category === categoria.name
                      )}
                      abrirModal={this.open}
                    />
                  )}
                />
              ))}
              {posts.map(post => (
                <div className="container" key={post.id}>
                  <Route
                    exact
                    path={`/${this.props.categorias.find(
                      x => x.name === post.category
                    ).path}/${post.id}`}
                    render={() => (
                      <FullPost
                        abrirModalEditar={this.openEditar}
                        removePost={this.removePost}
                        show={this.state.showComments}
                        open={this.openComment}
                        id={post.id}
                        postUnico={post}
                      />
                    )}
                  />
                </div>
              ))}
              <ModalComponent
                show={this.state.showModalNovo}
                close={this.close}
                component={
                  <NovoPost
                    post={{}}
                    close={this.close}
                  />
                }
              />

              <ModalComponent
                show={this.state.showModalEditar}
                close={this.close}
                component={
                  <NovoPost
                    post={this.props.post}
                    close={this.close}
                  />
                }
              />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = store => {
  const posts = store.posts;
  const categorias = store.categorias;
  return {
    ...posts,
    ...categorias
  };
};

export default withRouter(
  connect(mapStateToProps, Map.mapDispatchToProps)(App)
);
