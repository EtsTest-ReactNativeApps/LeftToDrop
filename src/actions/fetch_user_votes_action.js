import { userVotesRef } from '../firebase/references';
import { FETCH_USER_VOTE_ITEM_IDS } from './types';

export const fetchUserVoteItemIDs = userID => dispatch => {
  userVotesRef.child(userID).on('value', snapshot => {
    const userVotes = snapshot.val() || {};
    const upvotedItemIDs = userVotes.upvotes || {};
    const downvotedItemIDs = userVotes.downvotes || {};
    let userVoteItemIDs = { upvotedItemIDs, downvotedItemIDs };

    dispatch({
      type: FETCH_USER_VOTE_ITEM_IDS,
      payload: userVoteItemIDs
    });
  });
};
