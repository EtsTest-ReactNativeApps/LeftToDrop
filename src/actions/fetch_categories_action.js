import { seasonsRef, categoriesRef } from '../firebase/references';
import { FETCH_CATEGORIES } from './types';

export default (fetchCategories = seasonID => dispatch => {
  let categories = [];
  // Get CategoryIDs from provided Season
  seasonsRef.child(seasonID).on('value', seasonSnap => {
    const categoryIDs = Object.keys(seasonSnap.val());

    for (let index in categoryIDs) {
      let categoryID = categoryIDs[index];

      // Gather Season's corresponding Category data
      categoriesRef.child(categoryID).once('value', categorySnap => {
        categories.push({ [categorySnap.key]: categorySnap.val() });

        // Dispatch after last Category only
        if (index == categoryIDs.length - 1) {
          dispatch({
            type: FETCH_CATEGORIES,
            payload: categories
          });
        }
      });
    }
  });
});