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

// Passes an array of favorite itemIDs to Redux
export const fetchFavoriteItemIDs = userID => dispatch => {
  getFavoriteItemIDs(userID, itemIDs => {
    dispatch({
      type: FETCH_FAVORITE_ITEM_IDS,
      payload: itemIDs
    });
  });
};

// Passes an object array of User's favorite Items to Redux
export const fetchFavoriteItems = userID => dispatch => {
  getFavoriteItemIDs(userID, itemIDs => {
    const items = [];

    itemIDs.forEach((itemID, index) => {
      // Gather corresponding Item data
      itemsRef.child(itemID).once('value', snapshot => {
        items.push({ [snapshot.key]: snapshot.val() });
        console.log(
          `\n\nINDEX ${index} => [${snapshot.key}]: ${snapshot.val()} \n`
        );

        // Dispatch after last Item only
        if (index == itemIDs.length - 1) {
          console.log('INDEX', index, '= ITEMIDSLENGTH', itemIDs.length);
          console.log('ITEMS:', items);
          dispatch({
            type: FETCH_FAVORITE_ITEMS,
            payload: items
          });
        }
      });
    });
  });
};
