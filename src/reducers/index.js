import { combineReducers } from 'redux';
import {
  favoriteItemIDsReducer,
  favoriteItemsReducer
} from './favorites_reducer';
import metadataReducer from './metadata_reducer';
import seasonsReducer from './seasons_reducer';
import categoriesReducer from './categories_reducer';
import itemsReducer from './items_reducer';
import itemReducer from './item_reducer';
import userReducer from './user_reducer';

export default (rootReducer = combineReducers({
  metadata: metadataReducer,
  seasons: seasonsReducer,
  categories: categoriesReducer,
  items: itemsReducer,
  item: itemReducer,
  user: userReducer,
  favoriteItemIDs: favoriteItemIDsReducer,
  favoriteItems: favoriteItemsReducer
}));
