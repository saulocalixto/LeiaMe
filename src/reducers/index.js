import {
  ALL_CATEGORIAS,
  ALL_POSTS,
  ADD_POST,
  EDITAR_POST,
  DELETE_POST,
  GET_COMMENTS
} from '../actions';
import { combineReducers } from 'redux'

export const initialState = {
  posts: [],
  categorias: [],
};

function posts(state = initialState, action) {
  let posts = [];
  switch(action.type){
      case ALL_CATEGORIAS:
      const categorias = action.categorias
        return {
          ...state,
          categorias
        }
      case ALL_POSTS :
      let postsProvisorios = action.posts;
      posts = postsProvisorios.map(post => {
        let data = { data: new Date(post.timestamp).toLocaleString('pt-BR') }
        post = Object.assign(post, data)
        return post;
      })
        return {
          ...state,
          posts
        };
      case ADD_POST:
      let data = { data: new Date(action.post.timestamp).toLocaleString('en-US') }
      const postData = Object.assign(action.post, data)
      posts = action.posts.concat(postData);
        return {
         ...state,
         posts
        }
      case EDITAR_POST :
        return {
        }
      case DELETE_POST:
        posts = action.posts.filter(x => x.id !== action.id)
        return {
          ...state,
          posts
        }
      case GET_COMMENTS:
        //posts = Object.assign(action.posts[action.id], action.comentarios);
        return {
          ...state,
          //posts
        }
      default :
        return state;
  }
}

export default combineReducers({
  posts,
})