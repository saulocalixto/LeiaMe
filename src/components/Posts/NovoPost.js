import React, { Component } from "react";
import { FormGroup, Form, FormControl, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import { connect } from "react-redux";
import * as Map from "../Maps.js";


class NovoPost extends Component {

  formValidation = (event) => {
    event.preventDefault();
    const formulario = event.target;

    const title = formulario["idTitulo"].value;
    const author = formulario["idAutor"].value;
    const body = formulario["idTextoPost"].value;
    const category = formulario["idCategoria"].value;
    const id = this.props.guid;
    if (title !== "" && author !== "") {
      if(Object.keys(this.props.post).length === 0) {
        let postAdd = {
          id,
          timestamp: Date.now(),
          title,
          body,
          author,
          category
        };
        this.props.addPost(postAdd, this.props.posts);
      } else {
        const postEdit = { title, body, author, category }
        const idEdit = this.props.post.id;
        this.props.editPost(idEdit, postEdit, this.props.posts);
      }
      this.props.close();
    }
    else {
      event.preventDefault();
      alert("Preecha todos os campos corretamente!")
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.formValidation}>
          <FormGroup controlId="idTitulo">
            <ControlLabel>Título</ControlLabel>
            <FormControl type="text"
              placeholder="Digite o título do post..."
              defaultValue={this.props.post.title} />
          </FormGroup>

          <FormGroup controlId="idAutor">
            <ControlLabel>Autor</ControlLabel>
            <FormControl type="text"
              placeholder="Digite seu nome aqui..."
              defaultValue={this.props.post.author} />
          </FormGroup>

          <FormGroup controlId="idCategoria">
            <ControlLabel>Categoria</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              defaultValue={this.props.post.category}>

              {this.props.categorias.map((categoria, index) => (
                <option key={index} value={categoria.name}>{categoria.name}</option>
              ))}
            </FormControl>

          </FormGroup >
          <FormGroup controlId="idTextoPost">
            <ControlLabel>Corpo do Post</ControlLabel>
            <FormControl componentClass="textarea"
              placeholder="Digite seu texto aqui..."
              style={{ height: 220 }}
              defaultValue={this.props.post.body} />
          </FormGroup>
          <Button type="submit" bsStyle="primary">
            Salvar
          </Button>
        </Form>

      </div>
    )
  }
}


export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(NovoPost);