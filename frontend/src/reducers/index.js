import * as Type from '../actions/type.js';
import { combineReducers } from "redux";
import sortBy from "sort-by";

export const initialStatePosts = {
  posts: [],
  loading: true
};

export const initialStateComments = { 
  loadingComentarios: true, 
  comentarios: [] }

function posts(state = initialStatePosts, action) {
  let posts = [];
  switch (action.type) {
    case Type.TODOS_POSTS:
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
    case Type.ADICIONAR_POST:
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
      posts.sort(sortBy("voteScore")).reverse();
      return {
        ...state,
        posts
      };
    case Type.ORDENA_POSTS: {
      posts = posts.concat(action.posts);
      switch (action.escolha) {
        case "qtdComments":
        posts.sort(sortBy("comentarios")).reverse();
          break;
        case "category":
          posts.sort(sortBy("category.name"));
          break;
        case "timestamp":
          posts.sort(sortBy("timestamp")).reverse();
          break;
        case "titulo":
          posts.sort(sortBy("title"));
          break;
        case "autor":
          posts.sort(sortBy("author"));
          break;
        default:
          posts.sort(sortBy("voteScore")).reverse();
      }

      return {
        ...state,
        posts
      };
    }
    case Type.PEGAR_POST:
      const post = action.posts.find(x => x.id === action.id);
      return {
        ...state,
        post
      };
    case Type.EDITAR_POST:
      let postEditar = Object.assign(action.post, { id: action.id });
      posts = action.posts.filter(x => x.id !== action.id).concat(postEditar);
      return {
        ...state,
        posts
      };
    case Type.APAGAR_POST:
      posts = action.posts.filter(x => x.id !== action.id);
      return {
        ...state,
        posts
      };
    case Type.VOTAR_POST:
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
    case Type.TODAS_CATEGORIAS:
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
  state = initialStateComments,
  action
) {
  let comentarios = [];
  let comentario = {};
  switch (action.type) {
    case Type.TODOS_COMENTARIOS:
      comentarios = action.comentarios
        .map(comentario => {
          let data = {
            data: new Date(comentario.timestamp).toLocaleString("pt-BR")
          };
          comentario = Object.assign(comentario, data, { editar: false });
          return comentario;
        })
        .filter(comentario => comentario.author !== undefined)
        .sort(sortBy("data"))
        .reverse();
      Object.assign(action.post, { comentarios });
      return {
        ...state,
        comentarios,
        loadingComentarios: false
      };
    case Type.ADICIONAR_COMENTARIO:
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
      comentarios.sort(sortBy("data")).reverse();
      return {
        ...state,
        comentarios,
        loadingComentarios: false
      };
    case Type.DELETAR_COMENTARIO:
      comentarios = action.post
        .filter(x => x.id !== action.id)
        .sort(sortBy("data"))
        .reverse();
      return {
        ...state,
        comentarios
      };
    case Type.VOTAR_COMENTARIO:
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
        .sort(sortBy("data"))
        .reverse();
      return {
        ...state,
        comentarios
      };
    case Type.MUDAVIEW_COMENTARIO:
      const editar = action.editar;
      comentario = action.comentario;
      comentario.editar = editar;
      return {
        ...state,
        editar,
        comentario
      };
    case Type.EDITAR_COMENTARIO:
      const comentarioEditado = action.comentario;
      let data = {
        data: new Date(comentarioEditado.timestamp).toLocaleString("pt-BR")
      };
      Object.assign(comentarioEditado, data, { editar: false });
      comentarios = action.comentarios.filter(x => x.id !== action.id);
      comentarios
        .push(comentarioEditado);
      comentarios
        .sort(sortBy("data"))
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
