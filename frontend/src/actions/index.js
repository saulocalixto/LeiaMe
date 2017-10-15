import * as ApiPosts from '../api/ApiPosts.js'
import * as ApiComments from '../api/ApiComments.js'
import * as ApiCategorias from '../api/ApiCategorias.js'
import * as Type from './type.js';

export const pegarTodasCategorias = (categorias) => {
  return {
    type: Type.TODAS_CATEGORIAS,
    categorias
  }
}

export const fetchCategorias = () => dispatch => (
  ApiCategorias.getAllCategories().then((categorias) => {
    dispatch(pegarTodasCategorias(categorias))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const pegarTodosPosts = (posts) => {
  return {
    type: Type.TODOS_POSTS,
    posts
  }
}

export const fetchPosts = () => dispatch => (
  ApiPosts.getAllPosts().then((posts) => {
    dispatch(pegarTodosPosts(posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const editarPost = (id, post, posts) => {
  return {
    type: Type.EDITAR_POST,
    posts,
    post,
    id
  }
}

export const fetchEditarPosts = (id, post, posts) => dispatch => (
  ApiPosts.editPost(id, post).then(() => {
    dispatch(editarPost(id, post, posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const ordenaPosts = (posts, escolha) => {
  return {
    type: Type.ORDENA_POSTS,
    posts,
    escolha
  }
}

export const apagarPost = (posts, id) => {
  return {
    type: Type.APAGAR_POST,
    posts,
    id
  }
}

export const fetchApagarPost = (posts, id) => dispatch => (
  ApiPosts.deletPost(id).then(() => {
    dispatch(apagarPost(posts, id))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const adicionarPost = (post, posts) => {
  return {
    type: Type.ADICIONAR_POST,
    post,
    posts
  }
}

export const fetchAdicionarPosts = (post, posts) => dispatch => (
  ApiPosts.addPost(post).then(() => {
    dispatch(adicionarPost(post, posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const pegarPost = (posts, id) => {
  return {
    type: Type.PEGAR_POST,
    posts,
    id
  }
}

export const votarPost = (id, vote, posts) => {
  return {
    type: Type.VOTAR_POST,
    vote,
    id,
    posts
  }
}

export const fetchVotarPost = (id, vote, posts) => dispatch => (
  ApiPosts.votePost(id, vote).then(() => {
    dispatch(votarPost(id, vote, posts))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const pegarComentariosPost = (id, comentarios, post) => {
  return {
    type: Type.TODOS_COMENTARIOS,
    id,
    comentarios,
    post
  }
}

export const fetchPegarComentariosPost = (id, post) => dispatch => (
  ApiComments.getAllCommentPost(id).then((comentarios) => {
    dispatch(pegarComentariosPost(id, comentarios, post))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const adicionarComentario = (comentario, comentarios) => {
  return {
    type: Type.ADICIONAR_COMENTARIO,
    comentario,
    comentarios
  }
}

export const fetchAdicionarComentario = (comentario, comentarios) => dispatch => (
  ApiComments.addComment(comentario).then(() => {
    dispatch(adicionarComentario(comentario, comentarios))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const deletarComentario = (post, id) => {
  return {
    type: Type.DELETAR_COMENTARIO,
    post,
    id
  }
}

export const fetchDeletarComentario = (post, id) => dispatch => (
  ApiComments.deleteComment(id).then(() => {
    dispatch(deletarComentario(post, id))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const mudaViewComentario = (editar, comentario) => {
  return {
    type: Type.MUDAVIEW_COMENTARIO,
    editar,
    comentario
  }
}

export const votarComentario = (id, vote, comentarios) => {
  return {
    type: Type.VOTAR_COMENTARIO,
    vote,
    id,
    comentarios
  }
}

export const fetchVotarComentario = (id, vote, comentarios) => dispatch => (
  ApiComments.voteComment(id, vote).then(() => {
    dispatch(votarComentario(id, vote, comentarios))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);

export const editarComentario = (id, comentario, comentarios) => {
  return {
    type: Type.EDITAR_COMENTARIO,
    id,
    comentario,
    comentarios
  }
}

export const fetchEditarComentario = (id, comentario, comentarios) => dispatch => (
  ApiComments.editComment(id, comentario).then(() => {
    dispatch(editarComentario(id, comentario, comentarios))
  }, erro => console.log(`Algo de errado não deu certo: ${erro}`))
);