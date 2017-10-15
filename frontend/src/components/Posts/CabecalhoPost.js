import React from "react";
import { Badge } from "react-bootstrap";

const CabecalhoPost = (props) => {
  return (
    <div className="post">
      <div style={{ textAlign: 'right', fontSize: 'x-small', color: 'gray' }}> <strong>Postado em:</strong> {props.post.data} </div>
      <div style={{ textAlign: 'left' }}> <strong>Categoria:</strong> {props.post.category.name} </div>
      <div style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}>
        <strong>Comentários: </strong>{props.qtdComentarios}
      </div>
      <div style={{ textAlign: 'left' }}><p><strong>Score:</strong> <Badge>{props.post.voteScore}</Badge></p></div>
    </div>
  )
}

export default CabecalhoPost;