import {
  ALL_CATEGORIAS,
  ALL_POSTS,
  ADD_POST,
  ORDENA_POSTS,
  EDITAR_POST,
  DELETE_POST,
  GET_COMMENTS,
  ADD_COMMENT,
  MUDAVIEW_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  GET_POST,
  VOTE_POST,
  EDIT_COMMENT
} from "../actions";
import { combineReducers } from "redux";
import sortBy from "sort-by";

export const initialState = {
  posts: [],
  loading: true
};

function posts(state = initialState, action) {
  let posts = [];
  switch (action.type) {
    case ALL_POSTS:
      let postsProvisorios = action.posts;
      posts = postsProvisorios
        .map(post => {
          let data = { data: new Date(post.timestamp).toLocaleString("pt-BR") };
          post = Object.assign(post, data, { comentarios: [] });
          return post;
        })
        .filter(x => x.title !== undefined)
        .sort(sortBy("voteScore"))
        .reverse();
      const loading = false;
      return {
        ...state,
        posts,
        loading
      };
    case ADD_POST:
      let data = {
        data: new Date(action.post.timestamp).toLocaleString("pt-BR")
      };
      const postData = Object.assign(
        action.post,
        data,
        { voteScore: 1 },
        { comentarios: [] }
      );
      posts = action.posts.concat(postData);
      return {
        ...state,
        posts
      };
    case ORDENA_POSTS: {
      switch (action.escolha) {
        case "qtdComments":
          posts = action.posts.sort(sortBy("comentarios")).reverse();
          break;
        case "category":
          posts = action.posts.sort(sortBy("category"));
          break;
        case "voteScore":
          posts = action.posts.sort(sortBy("voteScore")).reverse();
          break;
        case "timestamp":
          posts = action.posts.sort(sortBy("timestamp")).reverse();
          break;
        case "titulo":
          posts = action.posts.sort(sortBy("title"));
          break;
        case "autor":
          posts = action.posts.sort(sortBy("author"));
          break;
        default:
          posts = action.posts.sort(sortBy("voteScore")).reverse();
      }

      return {
        ...state,
        posts
      };
    }
    case GET_POST:
      const post = action.posts.find(x => x.id === action.id);
      return {
        ...state,
        post
      };
    case EDITAR_POST:
      let postEditar = Object.assign(action.post, { id: action.id });
      posts = action.posts.filter(x => x.id !== action.id).concat(postEditar);
      return {
        ...state,
        posts
      };
    case DELETE_POST:
      posts = action.posts.filter(x => x.id !== action.id);
      return {
        ...state,
        posts
      };
    case VOTE_POST:
      const postVote = action.posts.find(x => x.id === action.id);
      switch (action.vote) {
        case "upVote":
          postVote.voteScore += 1;
          break;
        case "downVote":
          postVote.voteScore -= 1;
          break;
        case "loved":
          postVote.voteScore += 3;
          break;
        default:
          console.log("Opção inválida.");
      }
      posts = action.posts
        .filter(x => x.id !== action.id)
        .concat(postVote)
        .sort(sortBy("voteScore"))
        .reverse();

      return {
        ...state,
        posts
      };
    default:
      return state;
  }
}

function categorias(state = { categorias: [] }, action) {
  switch (action.type) {
    case ALL_CATEGORIAS:
      const categorias = action.categorias;
      categorias.sort(sortBy("name"));
      return {
        ...state,
        categorias
      };
    default:
      return state;
  }
}

function comentarios(
  state = { loadingComentarios: true, comentarios: [] },
  action
) {
  let comentarios = [];
  let comentario = {};
  switch (action.type) {
    case GET_COMMENTS:
      comentarios = action.comentarios
        .map(comentario => {
          let data = {
            data: new Date(comentario.timestamp).toLocaleString("pt-BR")
          };
          comentario = Object.assign(comentario, data, { editar: false });
          return comentario;
        })
        .filter(comentario => comentario.author !== undefined)
        .sort(sortBy("voteScore"))
        .reverse();
      Object.assign(action.post, { comentarios });
      return {
        ...state,
        comentarios,
        loadingComentarios: false
      };
    case ADD_COMMENT:
      let dataComment = {
        data: new Date(action.comentario.timestamp).toLocaleString("pt-BR")
      };
      comentarios = action.comentarios.filter(x => x.id !== undefined);
      comentario = action.comentario;
      Object.assign(
        comentario,
        dataComment,
        { voteScore: 1 },
        { editar: false }
      );
      comentarios.push(comentario);
      comentarios.sort(sortBy("voteScore")).reverse();
      return {
        ...state,
        comentarios,
        loadingComentarios: false
      };
    case DELETE_COMMENT:
      comentarios = action.post
        .filter(x => x.id !== action.id)
        .sort(sortBy("voteScore"))
        .reverse();
      return {
        ...state,
        comentarios
      };
    case VOTE_COMMENT:
      const commentVote = action.comentarios.find(x => x.id === action.id);
      switch (action.vote) {
        case "upVote":
          commentVote.voteScore += 1;
          break;
        case "downVote":
          commentVote.voteScore -= 1;
          break;
        default:
          console.log("Opção inválida.");
      }
      comentarios = action.comentarios
        .filter(x => x.id !== action.id)
        .concat(commentVote)
        .sort(sortBy("voteScore"))
        .reverse();
      return {
        ...state,
        comentarios
      };
    case MUDAVIEW_COMMENT:
      const editar = action.editar;
      comentario = action.comentario;
      comentario.editar = editar;
      return {
        ...state,
        editar,
        comentario
      };
    case EDIT_COMMENT:
      const comentarioEditado = action.comentario;
      let data = {
        data: new Date(comentarioEditado.timestamp).toLocaleString("pt-BR")
      };
      Object.assign(comentarioEditado, data, { editar: false });
      comentarios = action.comentarios.filter(x => x.id !== action.id);
      comentarios
        .push(comentarioEditado);
      comentarios
        .sort(sortBy("voteScore"))
        .reverse();
      return {
        ...state,
        comentarios
      };
    default:
      return {
        ...state
      };
  }
}

export default combineReducers({
  posts,
  categorias,
  comentarios
});
