import {
  FETCH_UPVOTED_ITEM_IDS,
  FETCH_DOWNVOTED_ITEM_IDS
} from '../actions/types';

// Returns an object array of upvotedItemIDs
export const upvotedItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_UPVOTED_ITEM_IDS:
      return action.payload || null;
    default:
      return state;
  }
};

// Returns an object array of downvotedItemIDs
export const downvotedItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_DOWNVOTED_ITEM_IDS:
      return action.payload || null;
    default:
      return state;
  }
};
