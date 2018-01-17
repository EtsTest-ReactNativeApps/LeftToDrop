import { upvotedItemsRef, downvotedItemsRef } from '../firebase/references';
import { FETCH_UPVOTED_ITEM_IDS, FETCH_DOWNVOTED_ITEM_IDS } from './types';

export const fetchUpvotedItemIDs = userID => dispatch => {
  upvotedItemsRef.child(userID).on('value', snapshot => {
    const upvotedItemIDsObjectArray = snapshot.val() || {};
    dispatch({
      type: FETCH_UPVOTED_ITEM_IDS,
      payload: upvotedItemIDsObjectArray
    });
  });
};

export const fetchDownvotedItemIDs = userID => dispatch => {
  downvotedItemsRef.child(userID).on('value', snapshot => {
    const downvotedItemIDsObjectArray = snapshot.val() || {};
    dispatch({
      type: FETCH_DOWNVOTED_ITEM_IDS,
      payload: downvotedItemIDsObjectArray
    });
  });
};
