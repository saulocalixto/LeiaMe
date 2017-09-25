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
    method: 'POST',
    headers: {
      'Authorization': 'Saulo',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(res => {res.json()});

export const getPost = (id) =>
  fetch(`${api}/posts:${id}`, {
    headers,
    method: 'GET'
  })
  .then(res => res.json());


export const editPost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Saulo',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
    .then(data => data);

export const deletPost = (id) =>
fetch(`${api}/posts/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': 'Saulo',
  }
}).then(res => res.json())