import {
  FETCH_FAVORITE_ITEM_IDS,
  FETCH_FAVORITE_ITEMS
} from '../actions/types';

// Payloads are objects for constant-time access
// - e.g. instead of state=[ID1, ID2, ...], use state={ID1: true, ID2: true, ...}
// So we can check state['ID']

// Returns an object array of favoriteItemIDs
export const favoriteItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ITEM_IDS:
      return action.payload || null;
    default:
      return state;
  }
};

export const favoriteItemsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ITEMS:
      return action.payload || null;
    default:
      return state;
  }
};
