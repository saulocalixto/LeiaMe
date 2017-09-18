const api = "http://localhost:3001"

export const getAllPosts = () =>
  fetch(`${api}/posts`, {
    headers: { 'Authorization': 'Saulo' },
    method: 'GET'
  }).then(res => res.json())
    .then(data => data)

export const addPost = (posts) =>
  fetch(`${api}/posts`, {
    headers: { 'Authorization': 'Saulo' },
    method: 'PUT',
    body: JSON.stringify(posts)
  })
    .then(res => res.json())
    .catch(error => console.log(error));