import { favoritesRef, itemsRef } from '../firebase/references';
import { FETCH_FAVORITE_ITEM_IDS, FETCH_FAVORITE_ITEMS } from './types';

// Helper function that fetches an array of itemIDs
// and passes it back to the calling Action Creator
const getFavoriteItemIDs = (userID, callback) => {
  favoritesRef.child(userID).once('value', snapshot => {
    const itemIDs = Object.keys(snapshot.val());
    callback(itemIDs);
  });
};

export const fetchFavoriteItemIDs = userID => dispatch => {
  // Passes an array of favorite itemIDs to Redux
  getFavoriteItemIDs(userID, itemIDs => {
    dispatch({
      type: FETCH_FAVORITE_ITEM_IDS,
      payload: itemIDs
    });
  });

  // Passes an object array of User's favorite Items to Redux
  getFavoriteItemIDs(userID, itemIDs => {
    const items = [];

    itemIDs.forEach((itemID, index) => {
      // Gather corresponding Item data
      itemsRef.child(itemID).once('value', snapshot => {
        items.push({ [snapshot.key]: snapshot.val() });

        // Dispatch after last Item only
        if (index == itemIDs.length - 1) {
          dispatch({
            type: FETCH_FAVORITE_ITEMS,
            payload: items
          });
        }
      });
    });
  });
};
