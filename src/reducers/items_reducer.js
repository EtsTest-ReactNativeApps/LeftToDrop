import { FETCH_ITEMS } from '../actions/types';

const itemsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      return action.payload;
    default:
      return state;
  }
};
