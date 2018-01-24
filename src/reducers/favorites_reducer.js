import {
  FETCH_FAVORITE_ITEM_IDS,
  FETCH_FAVORITE_ITEMS,
  LOGOUT_USER
} from '../actions/types';

// Payloads are objects for constant-time access
// - e.g. instead of state=[ID1, ID2, ...], use state={ID1: true, ID2: true, ...}
// So we can check state['ID']

// Returns an object array of favoriteItemIDs {itemID: true, ...}
export const favoriteItemIDsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ITEM_IDS:
      return action.payload || null;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

// Returns an object array of favoriteItems {itemID: {ITEM_PROPS}, ...}
export const favoriteItemsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ITEMS:
      return action.payload || null;
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
};
