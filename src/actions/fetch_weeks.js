import { favoritesRef, itemsRef } from '../firebase/references';
import { FETCH_FAVORITE_ITEM_IDS, FETCH_FAVORITE_ITEMS } from './types';

export const fetchFavorites = userID => dispatch => {
  favoritesRef.child(userID).on('value', snapshot => {
    // Passes an object array of favorite itemIDs
    const favoriteItemIDsObjectArray = snapshot.val() || {};
    dispatch({
      type: FETCH_FAVORITE_ITEM_IDS,
      payload: favoriteItemIDsObjectArray
    });

    const items = [],
      promises = [];
    const itemIDs = Object.keys(snapshot.val() || {});

    itemIDs.forEach((itemID, index) => {
      // Gather corresponding Item data
      const promise = itemsRef.child(itemID).once('value', snapshot => {
        items.push({ [snapshot.key]: snapshot.val() });
      });
      promises.push(promise);
    });

    Promise.all(promises).then(values => {
      // Passes an array of item objects [ { [item.id]: item.object }, ...]
      dispatch({
        type: FETCH_FAVORITE_ITEMS,
        payload: items
      });
    });
  });
};
