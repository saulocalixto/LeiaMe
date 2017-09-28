import React, { Component } from "react";
import * as AppCss from "../style/AppCss.js";
import MainPage from "./MainPage.js";
import NovoPost from "./Posts/NovoPost.js";
import * as Map from "./Maps.js";
import ModalComponent from "./Modal.js";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Menu from "./Menu.js";
import { withRouter } from "react-router-dom";
import ParcialPosts from "./Posts/ParcialPosts.js";
import FullPost from "./Posts/FullPost.js"

class App extends Component {
  state = {
    categorias: [],
    posts: [],
    value: "",
    id: "",
    post: {},
    showModal: false
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

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

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

  setId = e => {
    const idPesquisa = e.target.value;
    this.props.getFullPost(this.props.posts, idPesquisa);
  };

  Submit = formulario => {
    const title = formulario["idTitulo"].value;
    const author = formulario["idAutor"].value;
    const body = formulario["idTextoPost"].value;
    const category = formulario["idCategoria"].value;

    const post = {
      id: this.guid(),
      timestamp: (Date.now() / 1000) | 0,
      title,
      body,
      author,
      category,
      voteScore: 1
    };

    this.props.addPost(post, this.props.posts);

    this.close();
  };

  removePost = event => {
    this.props.deletPost(this.props.posts, event.target.value);
  };

  render() {
    this.props.posts.map(x =>
      this.props.getAllComments(x.id, this.props.posts)
    );
    return (
      <div className="wrap">
        <Menu />

        <Route exact path="/"
          render={() => ( <MainPage setId={this.setId} posts={this.props.posts} abrirModal={this.open} />)} />

          {/* <Route exact path="/musica"
          render={() => ( <MainPage posts={this.props.posts.filter(x => x.category === 'musica')}/>)} /> */}
        
        <Route
          path={`/post/${this.props.post.id}`}
          render={() => (
            <FullPost
              abrirModal={this.open}
              removePost={this.removePost}
            />
          )}
        />

        <ModalComponent
          show={this.state.showModal}
          close={this.close}
          component={
            <NovoPost
              submit={this.Submit}
              post={this.props.posts[0]}
              handleChange={this.handleChange}
              value={this.state.value}
            />
          }
        />
      </div>
    );
  }
}

export default withRouter(
  connect(Map.mapStateToProps, Map.mapDispatchToProps)(App)
);
