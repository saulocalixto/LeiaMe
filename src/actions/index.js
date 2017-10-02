import * as ApiPosts from '../api/ApiPosts.js'
import * as ApiComments from '../api/ApiComments.js'
import * as ApiCategorias from '../api/ApiCategorias.js'

export const ALL_CATEGORIAS = 'ALL_CATEGORIAS'
export const ALL_POSTS = 'ALL_POSTS';
export const ADD_POST = 'ADD_POST'
export const EDITAR_POST = 'EDITAR_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDITAR_COMENTARIO = 'EDITAR_COMENTARIO';
export const GET_POST = 'GET_POST';
export const VOTE_POST = 'VOTE_POST';


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

export function AddPost(post, posts) {
  return {
    type: ADD_POST,
    post,
    posts
  }
}

export const fetchAddPosts = (post, posts) => dispatch => (
  ApiPosts.addPost(post).then(() => {
    dispatch(AddPost(post, posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const getPost = (posts, id) => {
  return {
    type: GET_POST,
    posts,
    id
  }
}

export const votePost = (id, vote, posts) => {
  return {
    type: VOTE_POST,
    vote,
    id,
    posts
  }
}

export const fetchVotePost = (id, vote, posts) => dispatch => (
  ApiPosts.votePost(id, vote).then(() => {
    dispatch(votePost(id, vote, posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export function getCommentsPost(id, comentarios) {
  return {
    type: GET_COMMENTS,
    id,
    comentarios
  }
}

export const fetchgetCommentsPost = (id) => dispatch => (
  ApiComments.getAllCommentPost(id).then((comentarios) => {
    dispatch(getCommentsPost(id, comentarios))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export function addComment(comentario, comentarios) {
  return {
    type: ADD_COMMENT,
    comentario,
    comentarios
  }
}

export const fetchAddComment = (comentario, comentarios) => dispatch => (
  ApiComments.addComment(comentario).then(() => {
    dispatch(addComment(comentario, comentarios))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export function deleteComment(comentarios, id) {
  return {
    type: DELETE_COMMENT,
    comentarios,
    id
  }
}

export const fetchDeleteComment = (comentarios, id) => dispatch => (
  ApiComments.deleteComment(id).then(() => {
    dispatch(deleteComment(comentarios, id))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const voteComment = (id, vote, comentarios) => {
  return {
    type: VOTE_COMMENT,
    vote,
    id,
    comentarios
  }
}

export const fetchVoteComment = (id, vote, comentarios) => dispatch => (
  ApiComments.voteComment(id, vote).then(() => {
    dispatch(voteComment(id, vote, comentarios))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);