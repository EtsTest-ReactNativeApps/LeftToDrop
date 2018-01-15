import {
  FETCH_FAVORITE_ITEM_IDS,
  FETCH_FAVORITE_ITEMS
} from '../actions/types';

export const favoriteItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ITEM_IDS:
      return action.payload || {};
    default:
      return state;
  }
};

export const favoriteItemsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
