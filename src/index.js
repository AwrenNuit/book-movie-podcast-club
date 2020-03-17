import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App/App';

const bookListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_BOOK_LIST`:
      return [...state, action.payload];
    case `CLEAR_BOOK_LIST`:
      return [];
    default:
      return state;
  }
}

const movieListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_MOVIE_LIST`:
      return [...state, action.payload];
    case `CLEAR_MOVIE_LIST`:
      return [];
    default:
      return state;
  }
}

const podcastListReducer = (state=[], action) => {
  switch(action.type){
    case `SET_PODCAST_LIST`:
      return [...state, action.payload];
    case `CLEAR_PODCAST_LIST`:
      return [];
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
  bookListReducer,
  movieListReducer,
  podcastListReducer
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);