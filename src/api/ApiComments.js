const api = "http://localhost:3001"
const headers = { 'Authorization': 'Saulo' };

export const getAllCommentPost = (id) =>
  fetch(`${api}/posts/${id}/comments`, {
    headers,
    method: 'GET'
  }).then(res => res.json())
    .then(data => data)

export const addComment = (comentario) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': 'Saulo',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(comentario)
  })
    .then(res => { res.json() });

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Saulo',
    }
  }).then(res => res.json())

  export const voteComment = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Saulo',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ id, option: vote })
  }).then(res => res.json())