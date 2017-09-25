const api = "http://localhost:3001"
const headers = { 'Authorization': 'Saulo' };

export const getAllCommentPost = (id) =>
fetch(`${api}/posts/${id}/comments`, {
  headers,
  method: 'GET'
}).then(res => res.json())
  .then(data => data)