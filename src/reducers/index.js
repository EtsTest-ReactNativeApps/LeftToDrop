import { combineReducers } from 'redux';

import favoritesReducer from './favorites_reducer';
import seasonsReducer from './seasons_reducer';
import categoriesReducer from './categories_reducer';
import itemsReducer from './items_reducer';
import itemReducer from './item_reducer';
import userReducer from './user_reducer';

export default (rootReducer = combineReducers({
  favorites: favoritesReducer,
  seasons: seasonsReducer,
  categories: categoriesReducer,
  items: itemsReducer,
  item: itemReducer,
  user: userReducer
}));
