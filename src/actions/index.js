import * as ApiPosts from '../api/ApiPosts.js'
import * as ApiCategorias from '../api/ApiCategorias.js'

export const ALL_CATEGORIAS = 'ALL_CATEGORIAS'
export const ALL_POSTS = 'ALL_POSTS';
export const ADD_POST = 'ADD_POST'
export const EDITAR_POST = 'EDITAR_POST';
export const ADD_COMENTARIO = 'ADD_COMENTARIO';
export const EDITAR_COMENTARIO = 'EDITAR_COMENTARIO';


export function getAllPosts(post) {
  return {
    type: ALL_POSTS,
    post
  }
}

export const fetchPosts = () => dispatch => (
  ApiPosts.getAllPosts().then((posts) => {
    dispatch(getAllPosts(posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export function editarPost(posts) {
  return {
    type: EDITAR_POST,
    posts
  }
}

export function getAllCategorias(categorias) {
  return {
    type: ALL_CATEGORIAS,
    categorias
  }
}

export const fetchCategorias = () => dispatch => (
  ApiCategorias.getAllCategories().then((categorias) => {
    dispatch(getAllCategorias(categorias))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export function addPost(post, posts) {
  posts = posts.map(x => x.id).includes(post.id) ? posts : posts.concat(post);
  return {
    type: ADD_POST,
    posts
  }
}

export const fetchAddPosts = (post, posts) => dispatch => (
  ApiPosts.addPost(post).then((post) => {
    dispatch(addPost(post, posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);