import { usersRef } from '../firebase/references';

export const upvoteItem = (itemID, userID) => dispatch => {
  usersRef.child(userID + '/upvotedItemIDs').update({ [itemID]: true });
};

export const downvoteItem = (itemID, userID) => dispatch => {
  usersRef.child(userID + '/downvotedItemIDs').update({ [itemID]: true });
};

// Remove itemIDs from both lists
export const unvoteItem = (itemID, userID) => dispatch => {
  usersRef.child(userID + '/upvotedItemIDs/' + itemID).remove();
  usersRef.child(userID + '/downvotedItemIDs/' + itemID).remove();
};
