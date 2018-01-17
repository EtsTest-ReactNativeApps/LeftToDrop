import {
  rootRef,
  itemsRef,
  upvotedItemsRef,
  downvotedItemsRef
} from '../firebase/references';

// 'value' will either be 'true' or 'null'

export const toggleUpvoteItem = (itemID, userID, value) => dispatch => {
  itemsRef.child(itemID + '/upvotes').transaction(upvoteCount => {
    // Generate incremented/decremented value
    const newCount = (upvoteCount || 0) + (value ? 1 : -1);

    // Create new data object
    let updatedUpvoteData = {};
    updatedUpvoteData['upvotedItems/' + userID + '/' + itemID] = value;
    updatedUpvoteData['items/' + itemID + '/upvotes'] = newCount;

    // Execute deep-path update
    rootRef.update(updatedUpvoteData, error => {
      if (error) {
        console.log('Failed to upvote item: ', error);
      }
    });
  });
};

export const toggleDownvoteItem = (itemID, userID, value) => dispatch => {
  itemsRef.child(itemID + '/downvotes').transaction(downvoteCount => {
    // Generate incremented/decremented value
    const newCount = (downvoteCount || 0) + (value ? 1 : -1);

    // Create new data object
    let updatedDownvoteData = {};
    updatedDownvoteData['downvotedItems/' + userID + '/' + itemID] = value;
    updatedDownvoteData['items/' + itemID + '/downvotes'] = newCount;

    // Execute deep-path update
    rootRef.update(updatedDownvoteData, error => {
      if (error) {
        console.log('Failed to downvote item: ', error);
      }
    });
  });
};
