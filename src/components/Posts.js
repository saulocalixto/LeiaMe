import React, { Component } from "react";
import * as AppCss from "../style/PostsCss.js";
import * as Map from "./Maps.js";
import { connect } from "react-redux";
import { Button, Panel, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import App from "./App.js";

class Posts extends Component {
  render() {
    return (
      <div style={AppCss.postagens}>
        <Accordion>
        {this.props.post.map((x, index) => (

          <Panel 
          header={x.title} 
          bsStyle="primary"
          eventKey={index + 1}>
            <div className="post">
              <div>Autor: {x.author}</div>
              <div>{x.body}</ div>
              <div style={AppCss.like}>{x.voteScore}</div>
            </div>
          </Panel>
        ))}
        <div style={AppCss.Botao}>
          <Button bsStyle="primary" onClick={this.props.abrirModal}>
            Novo Post
          </Button>
        </div>
        </Accordion>
      </div>
    );
  }
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(Posts);
