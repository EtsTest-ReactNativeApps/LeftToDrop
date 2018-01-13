import { seasonsRef, categoriesRef } from '../firebase/references';
import { FETCH_CATEGORIES } from './types';

export default (fetchCategories = seasonID => dispatch => {
  if (!seasonID) {
    return {
      type: FETCH_CATEGORIES,
      payload: null
    };
  }

  let categories = [];
  // Get CategoryIDs from provided Season
  seasonsRef.child(seasonID).on('value', seasonSnap => {
    const categoryIDs = Object.keys(seasonSnap.val());

    //for (let index in categoryIDs) {
    //  let categoryID = categoryIDs[index];
    categoryIDs.forEach((categoryID, index) => {
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
    });
  });
});
