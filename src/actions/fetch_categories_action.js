import { seasonsRef, categoriesRef } from '../firebase/references';
import { FETCH_CATEGORIES } from './types';

export default (fetchCategories = seasonID => dispatch => {
  if (!seasonID) {
    return {
      type: FETCH_CATEGORIES,
      payload: null
    };
  }

  // Get CategoryIDs from provided Season
  seasonsRef.child(seasonID + '/categoryIDs').on('value', seasonSnap => {
    let categories = [],
      promises = [];
    const categoryIDs = Object.keys(seasonSnap.val());

    categoryIDs.forEach((categoryID, index) => {
      // Gather Season's corresponding Category data
      const promise = categoriesRef
        .child(categoryID)
        .once('value', categorySnap => {
          categories.push({ [categorySnap.key]: categorySnap.val() });
        });
      promises.push(promise);
    });

    Promise.all(promises).then(values => {
      // Passes an array of category objects [ { [category.id]: category.object }, ...]
      dispatch({
        type: FETCH_CATEGORIES,
        payload: categories
      });
    });
  });
});
