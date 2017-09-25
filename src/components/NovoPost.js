import React, { Component } from "react";
import { FormGroup, Form, FormControl, Button, ControlLabel, HelpBlock, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import * as Map from "./Maps.js";
import Modal from './Modal.js'


class NovoPost extends Component {

  formValidation = (event) => {
    const formulario = event.target;
    const title = formulario["idTitulo"].value;
    const author = formulario["idAutor"].value;

    if (title !== "" && author !== "") {
      this.props.submit(formulario)
    }
    else {
      event.preventDefault();
      alert("Preecha todos os campos corretamente!")
    }
  }

  FieldGroup = ({ id, label, help, ...props }) => {
    return (
      <FormGroup controlId={id}
        onChange={this.props.handleChange}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl />
        {help && <HelpBlock>Campo não pode estar vazio.</HelpBlock>}
      </FormGroup>
    );
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.formValidation}>
          <this.FieldGroup
            id="idTitulo"
            type="text"
            value=""
            label="Título"
            placeholder="Digite o título"
          />

          <this.FieldGroup
            id="idAutor"
            type="text"
            value=""
            label="Autor"
            placeholder="Digite o autor"
          />

          <FormGroup controlId="idCategoria">
            <ControlLabel>Categoria</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              {this.props.categorias.map((categoria, index) => (
                <option key={index} value={categoria.name}>{categoria.name}</option>
              ))}
            </FormControl>

          </FormGroup >
          <FormGroup controlId="idTextoPost">
            <ControlLabel>Corpo do Post</ControlLabel>
            <FormControl componentClass="textarea"
              placeholder="Digite seu texto aqui..."
              style={{ height: 220 }} />
          </FormGroup>
          <Button type="submit" bsStyle="primary">
            Submit
          </Button>
        </Form>

      </div>
    )
  }
}


export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(NovoPost);