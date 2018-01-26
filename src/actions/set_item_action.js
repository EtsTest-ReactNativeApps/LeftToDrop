import { rootRef } from '../firebase/references';

export const toggleUpvoteItem = (itemID, userID, value) => dispatch => {
  toggleItemVote(itemID, userID, value, 'upvotes');
};

export const toggleDownvoteItem = (itemID, userID, value) => dispatch => {
  toggleItemVote(itemID, userID, value, 'downvotes');
};

// voteSubpath is either 'upvotes' or 'downvotes'
const toggleItemVote = (itemID, userID, value, voteSubpath) => {
  let updates = {};
  updates['/userVotes/' + userID + '/' + voteSubpath + '/' + itemID] = value;
  updates['/itemVotes/' + itemID + '/' + voteSubpath + '/' + userID] = value;
  rootRef.update(updates);
};
