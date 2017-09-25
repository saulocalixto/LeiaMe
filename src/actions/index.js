import * as ApiPosts from '../api/ApiPosts.js'
import * as ApiComments from '../api/ApiComments.js'
import * as ApiCategorias from '../api/ApiCategorias.js'

export const ALL_CATEGORIAS = 'ALL_CATEGORIAS'
export const ALL_POSTS = 'ALL_POSTS';
export const ADD_POST = 'ADD_POST'
export const EDITAR_POST = 'EDITAR_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const EDITAR_COMENTARIO = 'EDITAR_COMENTARIO';


export function getAllPosts(posts) {
  return {
    type: ALL_POSTS,
    posts
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

export function deletePost(posts, id) {
  return {
    type: DELETE_POST,
    posts,
    id
  }
}

export const fetchDeletPost = (posts, id) => dispatch => (
  ApiPosts.deletPost(id).then(() => {
    dispatch(deletePost(posts, id))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export function addPost(post, posts) {
  return {
    type: ADD_POST,
    post,
    posts
  }
}

export const fetchAddPosts = (post, posts) => dispatch => (
  ApiPosts.addPost(post).then(() => {
    dispatch(addPost(post, posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export function getCommentsPost(id, posts, comentarios) {
  return {
    type: GET_COMMENTS,
    id,
    posts,
    comentarios
  }
}

export const fetchgetCommentsPost = (id, posts) => dispatch => (
  ApiComments.getAllCommentPost(id).then((comentarios) => {
    dispatch(getCommentsPost(id, posts, comentarios))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);