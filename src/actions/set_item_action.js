import { rootRef } from '../firebase/references';

export const toggleUpvoteItem = (itemID, userID, value) => dispatch => {
  toggleItemVote(itemID, userID, value, 'upvotingUsers', 'upvotedItems');
};

export const toggleDownvoteItem = (itemID, userID, value) => dispatch => {
  toggleItemVote(itemID, userID, value, 'downvotingUsers', 'downvotedItems');
};

// Simultaneously update both user's up/downvotedItems
// and item's up/downvotingUsers to keep values consistent
const toggleItemVote = (itemID, userID, value, itemSubpath, rootPath) => {
  let updates = {};
  updates[rootPath + '/' + userID + '/' + itemID] = value;
  updates['items/' + itemID + '/' + itemSubpath + '/' + userID] = value;
  rootRef.update(updates);
};
