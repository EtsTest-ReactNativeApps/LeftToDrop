import { FETCH_CATEGORIES } from '../actions/types';

const categoriesReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
