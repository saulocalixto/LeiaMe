import React, { Component } from "react";
import * as AppCss from "../style/AppCss.js";
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
import * as ApiPosts from '../api/ApiPosts.js'
import sortBy from 'sort-by'

class App extends Component {
  state = {
    sort: 'voteScore',
    id: "",
    showModal: false,
    showComments: false
  };

  vote = (id, vote) => {
    ApiPosts.votePost(id, vote).then();
};

  tipoSort = sort => {
    this.setState({sort});
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

  setId = id => {
    this.props.getFullPost(this.props.posts, id);
    this.props.getAllComments(id);
  };

  render() {
    return (
      <div className="wrap">

        <Menu tipoSort={this.tipoSort} />

        {this.props.loading ? 
          <div style={PostsCss.mensagem}>Loading...</div> 
          :
          <div>
            <Route
              exact path="/"
              render={() => (
                <ParcialPosts
                  posts={this.props.posts.sort(sortBy(this.state.sort)).reverse()}
                  setId={this.setId}
                  abrirModal={this.open}
                />
              )}
            />

            {this.props.categorias.map(categoria => (
              <Route
                exact path={`/${categoria.path}`}
                render={() => (
                  <ParcialPosts
                    posts={this.props.posts
                      .filter(post => post.category === categoria.name)
                      .sort(sortBy(this.state.sort))
                      .reverse()}
                    setId={this.setId}
                    abrirModal={this.open}
                  />
                )}
              />
            ))}
            {this.props.posts.map(post => (
              <Route
                exact path={`/post/${post.id}`}
                render={() => (
                  <FullPost 
                    abrirModal={this.open} 
                    removePost={this.removePost} 
                    vote={this.vote}
                    show={this.state.showComments}
                    open={this.openComment}
                    postUnico={this.props.posts.find(x => x.id === post.id)} />
                )}
              />
            ))}

            <ModalComponent
              show={this.state.showModal}
              close={this.close}
              component={
                <NovoPost
                  submit={this.SubmitPost}
                  post={this.props.posts[0]}
                  handleChange={this.handleChange}
                  close={this.close}
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
