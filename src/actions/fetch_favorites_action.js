import { favoritesRef, itemsRef } from '../firebase/references';
import { FETCH_FAVORITE_ITEM_IDS, FETCH_FAVORITE_ITEMS } from './types';

// Single function that dispatches to separate Action Creators
export const fetchFavorites = userID => dispatch => {
  favoritesRef.child(userID).on('value', snapshot => {
    // Passes an object array of favorite itemIDs to Redux
    dispatch({
      type: FETCH_FAVORITE_ITEM_IDS,
      payload: snapshot.val()
    });

    // Passes an object array of User's favorite Items to Redux
    const items = [],
      promises = [];
    const itemIDs = Object.keys(snapshot.val() || []);

    itemIDs.forEach((itemID, index) => {
      // Gather corresponding Item data
      var promise = itemsRef.child(itemID).once('value', snapshot => {
        items.push({ [snapshot.key]: snapshot.val() });

        // Dispatch after last Item only
        /*if (index == itemIDs.length - 1) {
          dispatch({
            type: FETCH_FAVORITE_ITEMS,
            payload: items
          });
        }*/
      });

      promises.push(promise);
    });

    Promise.all(promises).then(values => {
      dispatch({
        type: FETCH_FAVORITE_ITEMS,
        payload: items
      });
    });
  });
};
