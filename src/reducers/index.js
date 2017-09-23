import {
  ALL_CATEGORIAS,
  ALL_POSTS,
  ADD_POST,
  EDITAR_POST
} from '../actions';
import { combineReducers } from 'redux'

export const initialState = {
  posts: [ ],
  categorias: [],
};

function posts(state = initialState, action) {
  let posts = [];
  switch(action.type){
      case ALL_CATEGORIAS:
      const categorias = action.categorias
        return {
          ...state,
          categorias: categorias
        }
      case ALL_POSTS :
      posts = action.post;
        return {
          ...state,
          posts
        };
      case ADD_POST:
      posts = action.posts
        return {
         ...state,
         posts
        }
      case EDITAR_POST :
        return {
        }
      default :
        return state;
  }
}

export default combineReducers({
  posts,
})