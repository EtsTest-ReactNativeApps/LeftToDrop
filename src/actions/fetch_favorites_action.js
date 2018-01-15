import { favoritesRef, itemsRef } from '../firebase/references';
import { FETCH_FAVORITES } from './types';

export const fetchFavorites = userID => dispatch => {
  favoritesRef.child(userID).on('value', snapshot => {
    dispatch({
      type: FETCH_FAVORITES,
      payload: snapshot.val()
    });
  });
};

/*
// Helper function that fetches an array of itemIDs
// and passes it back to the calling Action Creator
const getFavoriteItemIDs = (userID, callback) => {
  favoritesRef.child(userID).on('value', snapshot => {
    const itemIDs = Object.keys(snapshot.val());
    callback(itemIDs);
  });
};

// Passes an object array of favorite itemIDs to Redux
// [ itemID: true, ...]
export const fetchFavoriteItemIDs = userID => dispatch => {
  getFavoriteItemIDs(userID, itemIDs => {
    const itemIDsObject = itemIDs.map(id => {
      return { [id]: true };
    });
    dispatch({
      type: FETCH_FAVORITE_ITEM_IDS,
      payload: itemIDsObject
    });
  });
};

// Passes an object array of User's favorite Items to Redux
// [ itemID: { ITEMFIELDKEY: ITEMFIELDVALUE, ...}, ...]
export const fetchFavoriteItems = userID => dispatch => {
  getFavoriteItemIDs(userID, itemIDs => {
    var items = [];

    itemIDs.forEach((itemID, index) => {
      // Gather corresponding Item data
      itemsRef.child(itemID).once('value', snapshot => {
        item = { [snapshot.key]: snapshot.val() };
        items.push(item);

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
};*/
