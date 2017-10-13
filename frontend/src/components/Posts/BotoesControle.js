import React from "react";
import { connect } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Map from "../Maps.js";
import IconTrash from "react-icons/lib/md/delete";
import BotaoEditar from "react-icons/lib/ti/pencil";

const popoverHoverFocus = mensagem => (
  <Popover id="popover-trigger-hover-focus">
    <strong>{mensagem}</strong>
  </Popover>
);

const editarPost = (props) => {
  props.getFullPost(props.posts, props.postUnico.id);
  props.abrirModal();
}

const BotoesControle = (props) => {
  return (
    <div style={{ float: "left" }}>
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="bottom"
        overlay={popoverHoverFocus("Editar Post")}
      >
        <Link to="#">
          <BotaoEditar
            size={"20px"}
            onClick={() => editarPost(props)}
          />
        </Link>
      </OverlayTrigger>

      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="bottom"
        overlay={popoverHoverFocus(
          "Remover Post"
        )}
      >
        <Link className="close-search" to="/">
          <IconTrash
            size={"20px"}
            onClick={() =>
              props.deletPost(
                props.posts,
                props.postUnico.id
              )}
            style={{ color: "red", marginLeft: "30px" }}
          />
        </Link>
      </OverlayTrigger>
    </div>
  )
}

const mapStateToProps = store => {
  const posts = store.posts["posts"];
  return {
    posts
  };
};

export default connect(mapStateToProps, Map.mapDispatchToProps)(BotoesControle);