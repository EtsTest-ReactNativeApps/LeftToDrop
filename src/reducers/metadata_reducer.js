import { FETCH_METADATA } from '../actions/types';

export default (metadataReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_METADATA:
      return action.payload;
    default:
      return state;
  }
});
