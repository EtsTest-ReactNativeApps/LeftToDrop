import { usersRef } from '../firebase/references';
import {
  FETCH_USER,
  FETCH_UPVOTED_ITEM_IDS,
  FETCH_DOWNVOTED_ITEM_IDS
} from './types';

export default (fetchUser = userID => dispatch => {
  usersRef.child(userID).on('value', snapshot => {
    const userObject = snapshot.val() || {};
    dispatch({
      type: FETCH_USER,
      payload: userObject
    });

    // If snapshot[*votedItemIDs] doesn't exist, return empty object array
    const upvotedItemIDsObjectArray = userObject['upvotedItemIDs'] || {};
    dispatch({
      type: FETCH_UPVOTED_ITEM_IDS,
      payload: upvotedItemIDsObjectArray
    });

    const downvotedItemIDsObjectArray = userObject['downvotedItemIDs'] || {};
    dispatch({
      type: FETCH_DOWNVOTED_ITEM_IDS,
      payload: downvotedItemIDsObjectArray
    });
  });
});
