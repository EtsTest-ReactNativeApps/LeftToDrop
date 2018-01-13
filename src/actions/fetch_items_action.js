import { categoriesRef, itemsRef } from '../firebase/references';
import { FETCH_ITEMS } from './types';

export default (fetchItems = categoryID => dispatch => {
  if (!categoryID) {
    return {
      type: FETCH_ITEMS,
      payload: null
    };
  }

  let items = [];
  // Get ItemIDs from provided Category
  categoriesRef.child(categoryID + '/itemIDs').on('value', categorySnap => {
    const itemIDs = Object.keys(categorySnap.val());

    //for (let index in itemIDs) {
    //  let itemID = itemIDs[index];
    itemIDs.forEach((itemID, index) => {
      // Gather Category's corresponding Item data
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
    });
  });
});
