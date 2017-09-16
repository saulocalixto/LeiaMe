const api = "http://localhost:3001"

export const getAllPosts = () =>
fetch(`${api}/posts`, {
  headers: { 'Authorization': 'Saulo' }
}).then(res => res.json())
  .then(data => data)