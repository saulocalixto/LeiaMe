import React, { Component } from "react";
import {
  FormGroup,
  Form,
  FormControl,
  Button,
  Well,
  OverlayTrigger,
  Panel,
  HelpBlock
} from "react-bootstrap";
import * as PostsCss from "../../style/PostsCss.js";
import Like from "react-icons/lib/ti/thumbs-up";
import NotLike from "react-icons/lib/ti/thumbs-down";
import { connect } from "react-redux";
import * as Map from "../Maps.js";
import IconTrash from "react-icons/lib/md/delete";
import { Link } from "react-router-dom";
import BotaoEditar from "react-icons/lib/ti/pencil";
import Guid from "../Guid.js"

class CommentsView extends Component {

  FieldGroup = ({ id, help, ...props }) => {
    return (
      <FormGroup controlId={id}>
        <FormControl />
        {help && <HelpBlock>Campo não pode estar vazio.</HelpBlock>}
      </FormGroup>
    );
  };

  formValidation = event => {
    event.preventDefault();
    const formulario = event.target;
    const author = formulario.idAutor.value;
    const body = formulario.idTextoComment.value;
    const { parentId } = this.props;

    if (!!body && !!author) {
      const comentario = {
        id: Guid(),
        timestamp: Date.now(),
        body,
        author,
        parentId
      };
      const comentarios = this.props.comentarios;
      this.props.addComment(comentario, comentarios);
      formulario.reset();
    } else {
      event.preventDefault();
      alert("Preecha todos os campos corretamente!");
    }
  };

  formValidationEdit = event => {
    event.preventDefault();

    const formulario = event.target;
    const body = formulario.idTextoComment.value;
    const { parentId } = this.props;
    const id = formulario.idComment.value;
    const author = formulario.authorComment.value;

    const comentarios = this.props.comentarios;
    const comentario = comentarios.find(x => x.id === id);

    if (!!body) {
      const comment = {
        id,
        timestamp: Date.now(),
        body,
        author,
        parentId,
        voteScore: comentario.voteScore
      };
      this.props.editComment(id, comment, comentarios);
    } else {
      event.preventDefault();
      alert("Preecha todos os campos corretamente!");
    }
  };

  render() {
    const {
      comentarios,
      popoverHoverFocus,
      voteComment,
      MudaView,
      deleteComment
    } = this.props;
    return (
      <div style={{ textAlign: "left" }}>
        <Well bsSize="small">
          <Form onSubmit={this.formValidation}>
            <div style={PostsCss.mensagem}>Comentários:</div>

            <FormGroup controlId="idAutor">
              <FormControl type="text" placeholder="Digite seu nome aqui..." />
            </FormGroup>

            <FormGroup controlId="idTextoComment">
              <FormControl
                componentClass="textarea"
                placeholder="Digite seu comentário aqui..."
                style={{ height: 120 }}
              />
            </FormGroup>
            <Button type="submit" bsStyle="primary">
              Salvar
            </Button>
          </Form>
        </Well>

        {comentarios.map(comentario => (
          <div style={{ marginTop: "15px" }} key={comentario.id}>
            <Panel header={`Por: ${comentario.author}`} eventKey="1">
              {comentario.editar ? (
                <Form onSubmit={this.formValidationEdit}>
                  <FormGroup controlId="idTextoComment">
                    <FormControl
                      componentClass="textarea"
                      defaultValue={comentario.body}
                      style={{ height: 120 }}
                    />
                  </FormGroup>
                  <FormGroup controlId="idComment">
                    <FormControl
                    defaultValue={comentario.id}
                      style={{ display: "none" }}
                    />
                  </FormGroup>
                  <FormGroup controlId="authorComment">
                    <FormControl
                    defaultValue={comentario.author}
                      style={{ display: "none" }}
                    />
                  </FormGroup>
                  <Button type="submit" bsStyle="primary">
                    Salvar
                  </Button>
                  <Button
                    type="reset"
                    bsStyle="default"
                    onClick={() => {
                      MudaView(false, comentario);
                    }}
                    style={{ float: "right" }}
                  >
                    Cancelar
                  </Button>
                </Form>
              ) : (
                  <div className="comentario">
                    <div style={{ marginTop: "10px" }}>{comentario.body}</div>
                    <div className="votacao" style={{ textAlign: "right" }}>
                      <Link to="#">
                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="top"
                          overlay={popoverHoverFocus("+1 ponto!")}
                        >
                          <Like
                            onClick={() =>
                              this.props.voteComment(
                                comentario.id,
                                "upVote",
                                comentarios
                              )}
                            size={"20px"}
                            style={{ margin: "15px" }}
                          />
                        </OverlayTrigger>
                      </Link>
                      <Link to="#">
                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="top"
                          overlay={popoverHoverFocus("-1 ponto!")}
                        >
                          <NotLike
                            onClick={() =>
                              voteComment(comentario.id, "downVote", comentarios)}
                            size={"20px"}
                          />
                        </OverlayTrigger>
                      </Link>
                      <div>
                        <strong>Score:</strong> {comentario.voteScore}{" "}
                      </div>
                    </div>
                    <div>
                      <hr />
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="top"
                        overlay={popoverHoverFocus("Editar Comentário")}
                      >
                        <Link to="#">
                          <BotaoEditar
                            size={"30px"}
                            onClick={() => {
                              MudaView(true, comentario);
                            }}
                          />
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="top"
                        overlay={popoverHoverFocus("Remover Comentário")}
                      >
                        <Link to="#">
                          <IconTrash
                            size={"30px"}
                            style={{
                              textAlign: "left",
                              color: "red",
                              marginLeft: "5px"
                            }}
                            onClick={() =>
                              deleteComment(comentarios, comentario.id)}
                          />
                        </Link>
                      </OverlayTrigger>
                      <span style={{ marginLeft: "200px" }}>
                        <strong>Data</strong>: {comentario.data}
                      </span>
                    </div>
                  </div>
                )}
            </Panel>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = store => {
  const comentarios = store.comentarios;
  return {
    ...comentarios
  };
};

export default connect(mapStateToProps, Map.mapDispatchToProps)(CommentsView);
