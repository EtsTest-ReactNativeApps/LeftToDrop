import { FETCH_SEASONS } from '../actions/types';

export default (seasonsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SEASONS:
      return action.payload;
    default:
      return state;
  }
});
