import {
  ALL_CATEGORIAS,
  ALL_POSTS,
  EDITAR_POST
} from '../actions';
import { combineReducers } from 'redux'

export const initialState = {
  post: [ ],
  categorias: [],
};

function posts(state = initialState, action) {
  switch(action.type){
      case ALL_CATEGORIAS:
      const categorias = action.categorias
        return {
          ...state,
          categorias: categorias
        }
      case ALL_POSTS :
      const posts = action.post;
        return {
          ...state,
          post: posts
        };
      default :
        return state;
  }
}

export default combineReducers({
  posts,
})