import React from "react";
import { connect } from "react-redux";
import { Button, Panel, OverlayTrigger, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import Heart from "react-icons/lib/ti/heart-full-outline";
import Like from "react-icons/lib/ti/thumbs-up";
import NotLike from "react-icons/lib/ti/thumbs-down";
import * as Map from "../Maps.js";

const popoverHoverFocus = mensagem => (
    <Popover id="popover-trigger-hover-focus">
      <strong>{mensagem}</strong>
    </Popover>
  );

const Votacao = (props) => {
    return (
        <div className="votacao" style={{ textAlign: "right" }}>
        <Link to="#">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popoverHoverFocus("+3 pontos!")}
          >
            <Heart
              className="Loved"
              onClick={() =>
                props.votePost(
                  props.postUnico.id,
                  "loved",
                  props.posts
                )}
              size={"20px"}
              style={{ color: "red" }}
            />
          </OverlayTrigger>
        </Link>
        <Link to="#">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popoverHoverFocus("+1 ponto!")}
          >
            <Like
              onClick={() =>
                props.votePost(
                  props.postUnico.id,
                  "upVote",
                  props.posts
                )}
              size={"20px"}
              style={{ margin: "15px" }}
            />
          </OverlayTrigger>
        </Link>
        <Link to="#">
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="bottom"
            overlay={popoverHoverFocus("-1 ponto!")}
          >
            <NotLike
              onClick={() =>
                props.votePost(
                  props.postUnico.id,
                  "downVote",
                  props.posts
                )}
              size={"20px"}
            />
          </OverlayTrigger>
        </Link>
      </div>
    )
}

const mapStateToProps = store => {
    const posts = store.posts["posts"];
    return {
      posts
    };
  };

export default connect(mapStateToProps, Map.mapDispatchToProps)(Votacao);