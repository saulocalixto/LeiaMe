import {
  ALL_CATEGORIAS,
  ALL_POSTS,
  ADD_POST,
  EDITAR_POST,
  DELETE_POST,
  GET_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  GET_POST,
  VOTE_POST
} from '../actions';
import { combineReducers } from 'redux'
import sortBy from 'sort-by'

export const initialState = {
  posts: [],
  post: {},
  categorias: [],
  comentarios: [],
  loading: true
};

function posts(state = initialState, action) {
  let posts = [];
  switch (action.type) {
    case ALL_CATEGORIAS:
      const categorias = action.categorias
      return {
        ...state,
        categorias
      }
    case ALL_POSTS:
      let postsProvisorios = action.posts;
      posts = postsProvisorios.map(post => {
        let data = { data: new Date(post.timestamp).toLocaleString('pt-BR') }
        post = Object.assign(post, data)
        return post;
      }).filter(x => x.title !== undefined).sort(sortBy('voteScore')).reverse()
      const loading = false;
      return {
        ...state,
        posts,
        loading
      };
    case ADD_POST:
      let data = { data: new Date(action.post.timestamp).toLocaleString('pt-BR') }
      const postData = Object.assign(action.post, data, { voteScore: 1 })
      posts = action.posts.concat(postData);
      return {
        ...state,
        posts
      }
    case GET_POST:
      const post = action.posts.find(x => x.id === action.id);
      return {
        ...state,
        post,
        loading: true
      }
    case EDITAR_POST:
      let postEditar = Object.assign(action.post, action.id);
      posts = action.posts.filter(x => x.id !== action.id).concat(postEditar);
        return {
          ...state,
          posts
        }
    case DELETE_POST:
      posts = action.posts.filter(x => x.id !== action.id)
      return {
        ...state,
        posts
      }
    case VOTE_POST:
      const postVote = action.posts.find(x => x.id === action.id);
      console.log(postVote)
      switch (action.vote) {
        case "upVote":
          postVote.voteScore += 1;
          break;
        case "downVote":
          postVote.voteScore -= 1;
          break
        case "loved":
          postVote.voteScore += 3;
          break
      }

      posts = action.posts.filter(x => x.id !== action.id).concat(postVote);

      return {
        ...state,
        posts
      }

    case GET_COMMENTS:
      const comments = action.comentarios.map(comentario => {
        let data = { data: new Date(comentario.timestamp).toLocaleString('pt-BR') }
        comentario = Object.assign(comentario, data)
        return comentario;
      }).filter(comentario => comentario.author !== undefined)
      return {
        ...state,
        comentarios: comments,
        loading: false
      }
    case ADD_COMMENT:
      let dataComment = { data: new Date(action.comentario.timestamp).toLocaleString('pt-BR') }
      const comentarioData = Object.assign(action.comentario, dataComment, { voteScore: 1 })
      const comentarios = action.comentarios.concat(comentarioData);
      return {
        ...state,
        comentarios
      }
    case DELETE_COMMENT:
      const coments = action.comentarios.filter(x => x.id !== action.id)
      return {
        ...state,
        comentarios: coments
      }
    case VOTE_COMMENT:
      const commentVote = action.comentarios.find(x => x.id === action.id);
      switch (action.vote) {
        case "upVote":
          commentVote.voteScore += 1;
          break;
        case "downVote":
          commentVote.voteScore -= 1;
          break
      }

      const comentariosVote = action.comentarios.filter(x => x.id !== action.id).concat(commentVote);

      return {
        ...state,
        comentarios: comentariosVote
      }
    default:
      return state;
  }
}

export default combineReducers({
  posts,
})