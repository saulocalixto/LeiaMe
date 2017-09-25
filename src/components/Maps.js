import { fetchPosts, fetchCategorias, fetchAddPosts, fetchDeletPost, fetchgetCommentsPost } from '../actions'

export const mapStateToProps = (store) => {
    const data = store.posts
    return {
      ...data
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
      allPosts: () => dispatch(fetchPosts()),
      allCategorias: () => dispatch(fetchCategorias()),
      addPost: (post, posts) => dispatch(fetchAddPosts(post, posts)),
      deletPost: (posts, id) => dispatch(fetchDeletPost(posts, id)),
      getAllComments: (id, posts) => dispatch(fetchgetCommentsPost(id, posts))
    }
  }