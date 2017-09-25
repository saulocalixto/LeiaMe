import React, { Component } from "react";
import * as AppCss from "../style/AppCss.js";
import ParcialPosts from "./ParcialPosts.js";
import FullPost from "./FullPost.js"
import NovoPost from "./NovoPost.js";
import * as ApiCategorias from "../api/ApiCategorias.js";
import * as ApiPosts from "../api/ApiPosts.js";
import * as Map from "./Maps.js";
import ModalComponent from "./Modal.js";
import { connect } from "react-redux";
import { fetchPosts, fetchCategorias } from "../actions";
import { Route } from "react-router-dom";
import { PageHeader } from 'react-bootstrap'
import Menu from './Menu.js'

class App extends Component {
  state = {
    categorias: [],
    posts: [],
    value: '',
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

handleChange = (e) => {
  this.setState({ value: e.target.value });
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

  setId = (e) => {
    this.setState({ id: e.target.value });
  };

  retornaPost = () => {
    const post = this.props.posts.filter(x => x.id === this.state.id);
    this.setState({ post });
    console.log(post)
    return 
  }

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
}

  render() {
    this.props.posts.map(x => this.props.getAllComments(x.id, this.props.posts));
    return (
      <div className="wrap">
        <div className="cabeçalho">
          <Menu style={AppCss.barraMenuStylus}/>
        </div>

        <Route exact path="/" render={() => 
          <ParcialPosts 
            abrirModal={this.open} 
            setId={this.setId}
          />} 
        />
        <Route path="/post/" render={() => 
          <FullPost  
            post={this.state.post} 
            abrirModal={this.open} 
            removePost={this.removePost}/> } 
        />

        <ModalComponent
          show={this.state.showModal}
          close={this.close}
          component={<NovoPost 
          submit={this.Submit} 
          post={this.props.posts[0]} 
          handleChange={this.handleChange}
          value={this.state.value}/>}
        />
      </div>
    );
  }
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(App);
