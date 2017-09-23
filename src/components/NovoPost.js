import React from 'react'
import {FormGroup, Form, FormControl,  Button, ControlLabel,HelpBlock} from 'react-bootstrap';
import { connect } from "react-redux";
import * as Map from "./Maps.js";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const NovoPost = (props) => (
  <div>
    <Form onSubmit={props.submit}>
      <FieldGroup
        id="idTitulo"
        type="text"
        label="Título"
        placeholder="Digite o título"
      />

      <FieldGroup
        id="idAutor"
        type="text"
        label="Autor"
        placeholder="Digite o autor"
      />

      <FormGroup controlId="idCategoria">
        <ControlLabel>Categoria</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          {props.categorias.map(categoria => (
            <option value={categoria.path}>{categoria.name}</option>
          ))}
        </FormControl>

      </FormGroup>
      <FormGroup controlId="idTextoPost">
      <ControlLabel>Corpo do Post</ControlLabel>
      <FormControl componentClass="textarea" placeholder="Digite seu texto aqui..." />
      </FormGroup>
      <Button type="submit" bsStyle="primary">
        Submit
      </Button>
    </Form>
  </div>
)


export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(NovoPost);