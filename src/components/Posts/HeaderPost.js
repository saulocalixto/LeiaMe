import React from "react";
import { Badge } from "react-bootstrap";

const HeaderPost = (props) => {
  return (
    <div className="post">
      <div style={{ textAlign: 'right', fontSize: 'x-small', color: 'gray' }}> <strong>Postado em:</strong> {props.post.data} </div>
      <div style={{ textAlign: 'left' }}> <strong>Categoria:</strong> {props.post.category} </div>
      <div style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}>
        <strong>Comentários: </strong>{props.post.comentarios.length}
      </div>
      <div style={{ textAlign: 'left' }}><p><strong>Score:</strong> <Badge>{props.post.voteScore}</Badge></p></div>
    </div>
  )
}

export const mapStateToProps = (store) => {
  const comentarios = store.posts.comentarios.length
  const post = store.posts.post
  return {
    comentarios,
    post
  }
}

export default HeaderPost;