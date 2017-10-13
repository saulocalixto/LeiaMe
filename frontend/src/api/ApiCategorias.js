const api = "http://localhost:3001"

export const getAllCategories = () =>
  fetch(`${api}/categories`, {
    headers: { 'Authorization': 'Saulo' }
  }).then(res => res.json())
    .then(data => data.categories)