import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App/App';

const bookListReducer = (state={}, action) => action.type === `SET_BOOK_LIST` ? [...state, action.payload] : state;

const store = createStore(
  combineReducers({
  bookListReducer
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);