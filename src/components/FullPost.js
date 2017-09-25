import React, { Component } from "react";
import * as AppCss from "../style/PostsCss.js";
import * as Map from "./Maps.js";
import HeaderPost from "./HeaderPost.js"
import { connect } from "react-redux";
import { Button, Panel, Accordion, Label, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import App from "./App.js";
import IconTrash from 'react-icons/lib/md/delete'
import iconRain from 'react-icons/lib/md/flash-on'

const FullPost = (props) => {
    return (
      <div style={AppCss.postagens}>
          {console.log(props.post)}
          <Panel
            header={`${props.post.title} || Por: ${props.post.author}`}
            bsStyle="primary"
            key={props.post.id}
            value={props.post.id}
            style={AppCss.Painel}
            eventKey={1} >
              <HeaderPost post={props.post} />
              <div style={{ textAlign: 'justify' }}> {props.post.body} </div>
            <Button
                value={props.post.id}
                bsStyle="danger"
                bsSize="small">
                Remover
            </Button>
            <Button
                value={props.post.id}
                bsStyle="primary"
                bsSize="small">
                Remover
            </Button>
          </Panel>
      </div>
    )
}

export default FullPost