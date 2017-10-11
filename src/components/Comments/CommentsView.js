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

class CommentsView extends Component {
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
    const author = formulario["idAutor"].value;
    const body = formulario["idTextoComment"].value;
    const parentId = this.props.parentId;

    if (body !== "" && author !== "") {
      const comment = {
        id: this.guid(),
        timestamp: Date.now(),
        body,
        author,
        parentId
      };
      const posts = this.props.posts.find(x => x.id === this.props.parentId);
      this.props.addComment(comment, posts);
      formulario.reset();
    } else {
      event.preventDefault();
      alert("Preecha todos os campos corretamente!");
    }
  };

  render() {
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

        {this.props.comentarios.map(x => (
          <div style={{ marginTop: "15px" }} key={x.id}>
            <Panel header={`Por: ${x.author}`} eventKey="1">
              {x.editar ? (
                <Form>
                  <FormGroup controlId="idTextoComment">
                    <FormControl
                      componentClass="textarea"
                      defaultValue={x.body}
                      style={{ height: 120 }}
                    />
                  </FormGroup>
                  <Button type="submit" bsStyle="primary">
                    Salvar
                  </Button>
                  <Button
                    type='reset'
                    bsStyle="danger"
                    onClick={() => {
                      this.props.MudaView(false, x);
                    }}
                    style={{ float: "right" }}
                  >
                    Cancelar
                  </Button>
                </Form>
              ) : (
                <div className="comentario">
                  <div style={{ marginTop: "10px" }}>{x.body}</div>
                  <div className="votacao" style={{ textAlign: "right" }}>
                    <Link to="#">
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="top"
                        overlay={this.props.popoverHoverFocus("+1")}
                      >
                        <Like
                          onClick={() =>
                            this.props.voteComment(
                              x.id,
                              "upVote",
                              this.props.comentarios
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
                        overlay={this.props.popoverHoverFocus("-1")}
                      >
                        <NotLike
                          onClick={() =>
                            this.props.voteComment(
                              x.id,
                              "downVote",
                              this.props.comentarios
                            )}
                          size={"20px"}
                        />
                      </OverlayTrigger>
                    </Link>
                    <div>
                      <strong>Score:</strong> {x.voteScore}{" "}
                    </div>
                  </div>
                  <div>
                    <hr />
                    <Link to="#">
                      <BotaoEditar
                        size={"30px"}
                        onClick={() => {
                          this.props.MudaView(true, x);
                        }}
                      />
                    </Link>
                    <Link to="#">
                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="top"
                        overlay={this.props.popoverHoverFocus("Deleta")}
                      >
                        <IconTrash
                          size={"30px"}
                          style={{
                            textAlign: "left",
                            color: "red",
                            marginLeft: "5px"
                          }}
                          onClick={() =>
                            this.props.deleteComment(this.props.post, x.id)}
                        />
                      </OverlayTrigger>
                    </Link>
                    <span style={{ marginLeft: "200px" }}>
                      <strong>Data</strong>: {x.data}
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
  const posts = store.posts["posts"];
  const editar = store.comentarios["editar"];
  return {
    posts,
    editar
  };
};

export default connect(mapStateToProps, Map.mapDispatchToProps)(CommentsView);
