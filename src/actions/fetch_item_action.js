import { itemsRef, itemVotesRef } from '../firebase/references';
import { FETCH_ITEM } from './types';

export const fetchItem = itemID => dispatch => {
  if (!itemID) {
    return {
      type: FETCH_ITEM,
      payload: null
    };
  }

  // Fetch item metdata
  itemsRef.child(itemID).on('value', snapshot => {
    let item = snapshot.val();

    // Fetch item up/downvotes
    itemVotesRef.child(itemID).on('value', snapshot => {
      const itemVotes = snapshot.val();
      item.upvoteCount = itemVotes
        ? Object.keys(itemVotes.upvotes || {}).length
        : 0;
      item.downvoteCount = itemVotes
        ? Object.keys(itemVotes.downvotes || {}).length
        : 0;

      dispatch({
        type: FETCH_ITEM,
        payload: item
      });
    });
  });
};
