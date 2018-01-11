import { combineReducers } from 'redux';

import { FETCH_FAVORITES } from '../actions';
import { FETCH_SEASONS } from '../actions';
import { FETCH_CATEGORIES } from '../actions';
import { FETCH_ITEMS } from '../actions';
import { FETCH_ITEM } from '../actions';

const favoritesReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      return action.payload;
    default:
      return state;
  }
};

const seasonsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SEASONS:
      return action.payload;
    default:
      return state;
  }
};

const categoriesReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

const itemsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      return action.payload;
    default:
      return state;
  }
};

const itemReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      return action.payload;
    default:
      return state;
  }
};

export default (rootReducer = combineReducers({
  favorites: favoritesReducer,
  seasons: seasonsReducer,
  categories: categoriesReducer,
  items: itemsReducer,
  item: itemReducer
}));
