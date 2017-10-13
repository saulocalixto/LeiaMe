import {
  fetchPosts,
  fetchCategorias,
  fetchAddPosts,
  fetchEditPosts,
  fetchDeletPost,
  fetchgetCommentsPost,
  fetchAddComment,
  getPost,
  fetchVotePost,
  fetchDeleteComment,
  fetchVoteComment,
  ordenaPosts,
  MudaViewComment,
  fetchEditComment
} from '../actions'

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const mapStateToProps = (store) => {
  const posts = store.posts;
  const categorias = store.categorias
  const comentarios = store.comentarios
  return {
    ...posts,
    ...categorias,
    ...comentarios,
    guid: guid()
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    allPosts: () => dispatch(fetchPosts()),
    allCategorias: () => dispatch(fetchCategorias()),
    addPost: (post, posts) => dispatch(fetchAddPosts(post, posts)),
    editPost: (id, post, posts) => dispatch(fetchEditPosts(id, post, posts)),
    deletPost: (posts, id) => dispatch(fetchDeletPost(posts, id)),
    getAllComments: (id, post) => dispatch(fetchgetCommentsPost(id, post)),
    addComment: (comentario, comentarios) => dispatch(fetchAddComment(comentario, comentarios)),
    getFullPost: (posts, id) => dispatch(getPost(posts, id)),
    votePost: (id, vote, posts) => dispatch(fetchVotePost(id, vote, posts)),
    voteComment: (id, vote, comentarios) => dispatch(fetchVoteComment(id, vote, comentarios)),
    deleteComment: (post, id) => dispatch(fetchDeleteComment(post, id)),
    editComment: (id, comentario, comentarios) => dispatch(fetchEditComment(id, comentario, comentarios)),
    ordenaPosts: (posts, escolha) => dispatch(ordenaPosts(posts, escolha)),
    MudaView: (editar, comentario) => dispatch(MudaViewComment(editar, comentario))
  }
}