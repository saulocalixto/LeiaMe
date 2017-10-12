import React, { Component } from "react";
import * as PostsCss from '../style/PostsCss.js'
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
    sort: 'voteScore',
    id: "",
    showModal: false,
    showComments: false
  };

  guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  tipoSort = sort => {
    this.props.ordenaPosts(this.props.posts, sort)
  }

  componentDidMount() {
    this.props.allCategorias();
    this.props.allPosts();
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  openComment = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    const { posts, loading, categorias } = this.props;
    return (
      <div className="wrap">
        <Menu tipoSort={this.tipoSort} />
        {loading ?
          <div style={PostsCss.mensagem}>Loading...</div>
          :
          <div>
            <Route
              exact path="/"
              render={() => (
                <ParcialPosts
                  posts={posts}
                  abrirModal={this.open}
                />
              )}
            />

            {categorias.map(categoria => (
              <Route
                key={categoria.path}
                exact path={`/${categoria.path}`}
                render={() => (
                  <ParcialPosts
                    filtro={categoria.name}
                    posts={posts
                      .filter(post => post.category === categoria.name)}
                    abrirModal={this.open}
                  />
                )}
              />
            ))}
            {posts.map((post) => (
              <div className='container' key={post.id}>
                <Route
                  exact path={`/${this.props.categorias.find(x => x.name === post.category).path}/${post.id}`}
                  render={() => (
                    <FullPost
                      abrirModal={this.open}
                      removePost={this.removePost}
                      show={this.state.showComments}
                      open={this.openComment}
                      id={post.id}
                      postUnico={post} />
                  )}
                />
              </div>
            ))}
            <ModalComponent
              show={this.state.showModal}
              close={this.close}
              component={
                <NovoPost
                  post={this.props.history.location.pathname === "/" ? {} : this.props.post}
                  close={this.close}
                  guid={this.guid}
                />
              }
            />
          </div>
        }
      </div>
    );
  }
}

export default withRouter(
  connect(Map.mapStateToProps, Map.mapDispatchToProps)(App)
);
