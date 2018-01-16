import { usersRef } from '../firebase/references';

// 'value' will either be 'true' or 'null'

export const toggleUpvoteItem = (itemID, userID, value) => dispatch => {
  usersRef.child(userID + '/upvotedItemIDs').update({ [itemID]: value });
  // Always remove from downvotedItemIDs just in case
  usersRef.child(userID + '/downvotedItemIDs').update({ [itemID]: null });
};

export const toggleDownvoteItem = (itemID, userID, value) => dispatch => {
  usersRef.child(userID + '/downvotedItemIDs').update({ [itemID]: value });
  // Always remove from upvotedItemIDs just in case
  usersRef.child(userID + '/upvotedItemIDs').update({ [itemID]: null });
};
