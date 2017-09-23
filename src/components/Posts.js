import React, { Component } from "react";
import * as AppCss from "../style/PostsCss.js";
import * as Map from "./Maps.js";
import { connect } from "react-redux";
import { Button, Panel, Accordion, Label, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import App from "./App.js";

class Posts extends Component {
  render() {
    return (
      <div style={AppCss.postagens}>
        <Accordion>
        {this.props.posts.map((x, index) => (
          <Panel 
          header={x.title} 
          bsStyle="primary"
          key={x.id}
          eventKey={index + 1}>
            <div className="post">
              <div><Label bsStyle="primary">Author:</Label> {x.author}</div>
              <div>{x.body}</ div>
              <div><p>Score: <Badge>{x.voteScore}</Badge></p></div>
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
