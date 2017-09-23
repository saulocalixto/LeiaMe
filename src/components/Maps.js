import { fetchPosts, fetchCategorias, fetchAddPosts } from '../actions'

export const mapStateToProps = (store) => {
    const posts = store.posts
    return {
      ...posts
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
      allPosts: () => dispatch(fetchPosts()),
      allCategorias: () => dispatch(fetchCategorias()),
      addPost: (post, posts) => dispatch(fetchAddPosts(post, posts))
    }
  }