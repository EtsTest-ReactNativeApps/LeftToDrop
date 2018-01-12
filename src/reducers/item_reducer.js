import { FETCH_ITEM } from '../actions/types';

const itemReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      return action.payload;
    default:
      return state;
  }
};
