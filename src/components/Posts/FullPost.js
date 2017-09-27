import React from "react";
import * as AppCss from "../../style/PostsCss.js";
import * as Map from "../Maps.js";
import HeaderPost from "./HeaderPost.js"
import { connect } from "react-redux";
import { Button, Panel } from "react-bootstrap";
import { Link } from "react-router-dom";
// import IconTrash from 'react-icons/lib/md/delete'
// import iconRain from 'react-icons/lib/md/flash-on'

const FullPost = (props) => {
    return (
      <div style={AppCss.postagens}>
          <Panel
            header={`${props.post.title} || Por: ${props.post.author}`}
            bsStyle="primary"
            key={props.post.id}
            value={props.post.id}
            style={AppCss.Painel}
            eventKey={1} >
              <HeaderPost post={props.post} />
              <div style={{ textAlign: 'justify' }}> {props.post.body} </div>
              <Link className="close-search" to="/">
                <Button
                    value={props.post.id}
                    bsStyle="danger"
                    onClick={props.removePost}
                    bsSize="small">
                    Remover
                </Button>
            </Link>
            <Button
                value={props.post.id}
                bsStyle="primary"
                bsSize="small"
                style={ {margin: '20px'} }>
                Editar
            </Button>
          </Panel>
      </div>
    )
}

export default connect(Map.mapStateToProps, Map.mapDispatchToProps)(FullPost);