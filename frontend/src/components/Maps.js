import {
  fetchPosts,
  fetchCategorias,
  fetchAdicionarPosts,
  fetchEditarPosts,
  fetchApagarPost,
  fetchPegarComentariosPost,
  fetchAdicionarComentario,
  pegarPost,
  fetchVotarPost,
  fetchDeletarComentario,
  fetchVotarComentario,
  ordenaPosts,
  mudaViewComentario,
  fetchEditarComentario
} from '../actions'

export const mapStateToProps = (store) => {
  const posts = store.posts;
  const categorias = store.categorias
  const comentarios = store.comentarios
  return {
    ...posts,
    ...categorias,
    ...comentarios
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    allCategorias: () => dispatch(fetchCategorias()),
    allPosts: () => dispatch(fetchPosts()),
    addPost: (post, posts) => dispatch(fetchAdicionarPosts(post, posts)),
    editPost: (id, post, posts) => dispatch(fetchEditarPosts(id, post, posts)),
    deletPost: (posts, id) => dispatch(fetchApagarPost(posts, id)),
    getAllComments: (id, post) => dispatch(fetchPegarComentariosPost(id, post)),
    getFullPost: (posts, id) => dispatch(pegarPost(posts, id)),
    votePost: (id, vote, posts) => dispatch(fetchVotarPost(id, vote, posts)),
    addComment: (comentario, comentarios) => dispatch(fetchAdicionarComentario(comentario, comentarios)),
    voteComment: (id, vote, comentarios) => dispatch(fetchVotarComentario(id, vote, comentarios)),
    deleteComment: (post, id) => dispatch(fetchDeletarComentario(post, id)),
    editComment: (id, comentario, comentarios) => dispatch(fetchEditarComentario(id, comentario, comentarios)),
    ordenaPosts: (posts, escolha) => dispatch(ordenaPosts(posts, escolha)),
    MudaView: (editar, comentario) => dispatch(mudaViewComentario(editar, comentario))
  }
}