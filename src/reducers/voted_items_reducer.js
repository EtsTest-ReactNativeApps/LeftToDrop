import {
  FETCH_UPVOTED_ITEM_IDS,
  FETCH_DOWNVOTED_ITEM_IDS
} from '../actions/types';

// Returns an array of upvotedItemIDs
export const upvotedItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_UPVOTED_ITEM_IDS:
      return action.payload;
    default:
      return state;
  }
};

// Returns an array of downvotedItemIDs
export const downvotedItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_DOWNVOTED_ITEM_IDS:
      return action.payload;
    default:
      return state;
  }
};
