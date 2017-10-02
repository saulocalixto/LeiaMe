import { fetchPosts,
    fetchCategorias,
    fetchAddPosts,
    fetchDeletPost, 
    fetchgetCommentsPost, 
    fetchAddComment, 
    getPost, 
    fetchVotePost,
    fetchDeleteComment,
    fetchVoteComment
} from '../actions'

const guid = () => {
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
    const data = store.posts;
    return {
      ...data,
      guid: guid()
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
      allPosts: () => dispatch(fetchPosts()),
      allCategorias: () => dispatch(fetchCategorias()),
      addPost: (post, posts) => dispatch(fetchAddPosts(post, posts)),
      deletPost: (posts, id) => dispatch(fetchDeletPost(posts, id)),
      getAllComments: (id) => dispatch(fetchgetCommentsPost(id)),
      addComment: (comentario, comentarios) => dispatch(fetchAddComment(comentario, comentarios)),
      getFullPost: (posts, id) => dispatch(getPost(posts, id)),
      votePost: (id, vote, posts) => dispatch(fetchVotePost(id, vote, posts)),
      voteComment: (id, vote, comentarios) => dispatch(fetchVoteComment(id, vote, comentarios)),
      deleteComment: (comentarios, id) => dispatch(fetchDeleteComment(comentarios, id))
    }
  }