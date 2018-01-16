import { usersRef } from '../firebase/references';
import { FETCH_UPVOTED_ITEM_IDS, FETCH_DOWNVOTED_ITEM_IDS } from './types';

export const fetchUpvotedItemIDs = userID => dispatch => {
  usersRef.child(userID + '/upvotedItemIDs').on(value, snapshot => {
    const upvotedItemIDs = Object.keys(snapshot.val());
    dispatch({
      type: FETCH_UPVOTED_ITEM_IDS,
      payload: upvotedItemIDs
    });
  });
};

export const fetchDownvotedItemIDs = userID => dispatch => {
  usersRef.child(userID + '/downvotedItemIDs').on(value, snapshot => {
    const downvotedItemIDs = Object.keys(snapshot.val());
    dispatch({
      type: FETCH_DOWNVOTED_ITEM_IDS,
      payload: downvotedItemIDs
    });
  });
};
