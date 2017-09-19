import { fetchPosts, fetchCategorias } from '../actions'

export const mapStateToProps = (store) => {
    const posts = store.posts
    return {
      ...posts
    }
  }
  
export const mapDispatchToProps = (dispatch) => {
    return {
      allPosts: () => dispatch(fetchPosts()),
      allCategorias: () => dispatch(fetchCategorias())
    }
  }