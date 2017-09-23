const api = "http://localhost:3001"
const headers = { 'Authorization': 'Saulo' };

export const getAllPosts = () =>
  fetch(`${api}/posts`, {
    headers,
    method: 'GET'
  }).then(res => res.json())
    .then(data => data)

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(post)
  }, post)
    .then(res => res.json())
    .catch(error => console.log(error));

export const getPost = (id) =>
  fetch(`${api}/posts:${id}`, {
    headers,
    method: 'GET'
  })
  .then(res => res.json())
  .catch(error => console.log(error));


export const editPost = (id, post) =>
  fetch(`${api}/posts:${id}`, {
    headers,
    method: 'PUT'
  }).then(res => res.json())
    .then(data => data);
