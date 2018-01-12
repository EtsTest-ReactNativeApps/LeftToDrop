import { FETCH_ITEM } from '../actions/types';

export default (itemReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      return action.payload;
    default:
      return state;
  }
});
