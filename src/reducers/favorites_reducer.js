import { FETCH_FAVORITES } from '../actions/types';

export default (favoritesReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      return action.payload;
    default:
      return state;
  }
});
