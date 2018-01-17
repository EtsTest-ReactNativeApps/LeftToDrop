import { categoriesRef, itemsRef } from '../firebase/references';
import { FETCH_ITEMS } from './types';

export default (fetchItems = categoryID => dispatch => {
  if (!categoryID) {
    return {
      type: FETCH_ITEMS,
      payload: null
    };
  }

  // Get ItemIDs from provided Category
  categoriesRef.child(categoryID + '/itemIDs').on('value', categorySnap => {
    let items = [],
      promises = [];
    const itemIDs = Object.keys(categorySnap.val());

    itemIDs.forEach((itemID, index) => {
      // Gather Category's corresponding Item data
      const promise = itemsRef.child(itemID).once('value', itemSnap => {
        items.push({ [itemSnap.key]: itemSnap.val() });
      });
      promises.push(promise);
    });

    Promise.all(promises).then(values => {
      // Passes an array of item objects [ { [item.id]: item.object }, ...]
      dispatch({
        type: FETCH_ITEMS,
        payload: items
      });
    });
  });
});
