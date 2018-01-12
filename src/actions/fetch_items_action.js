import { categoriesRef, itemsRef } from '../firebase/references';
import { FETCH_ITEMS } from './types';

export default (fetchItems = categoryID => dispatch => {
  let items = [];
  // Get Category data
  categoriesRef.child(categoryID + '/itemIDs').on('value', categorySnap => {
    const itemIDs = Object.keys(categorySnap.val());

    for (let index in itemIDs) {
      let itemID = itemIDs[index];

      itemsRef.child(itemID).once('value', itemSnap => {
        items.push({ [itemSnap.key]: itemSnap.val() });

        // Dispatch after last Item only
        if (index == itemIDs.length - 1) {
          dispatch({
            type: FETCH_ITEMS,
            payload: items
          });
        }
      });
    }
  });
});
