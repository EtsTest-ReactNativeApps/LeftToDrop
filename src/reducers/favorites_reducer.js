import { FETCH_FAVORITES } from '../actions/types';

const favoritesReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      return action.payload;
    default:
      return state;
  }
};
