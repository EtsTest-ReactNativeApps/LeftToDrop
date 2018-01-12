import Firebase from 'firebase';
import { firebaseConfig } from '../config/dev';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const FETCH_SEASONS = 'FETCH_SEASONS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEM = 'FETCH_ITEM';

const firebaseApp = Firebase.initializeApp(firebaseConfig);
const rootRef = Firebase.database().ref();

// Fetch Action Creators
// From FavoritesRef
export const fetchFavorites = userID => {
  return {
    type: FETCH_FAVORITES,
    payload: []
  };
};

const seasonsRef = rootRef.child('seasons');
export const fetchSeasons = () => dispatch => {
  seasonsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_SEASONS,
      payload: snapshot.val()
    });
  });
};

const categoriesRef = rootRef.child('categories');
export const fetchCategories = seasonID => dispatch => {
  let categories = [];
  // Get Season data
  seasonsRef.child(seasonID).on('value', seasonSnap => {
    const categoryIDs = Object.keys(seasonSnap.val());

    for (let index in categoryIDs) {
      let categoryID = categoryIDs[index];

      categoriesRef.child(categoryID).once('value', categorySnap => {
        categories.push(categorySnap.val());

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
};

// From CategoriesRef
export const fetchItems = categoryID => {
  return {
    type: FETCH_ITEMS,
    payload: []
  };
};

// From ItemsRef
export const fetchItem = itemID => {
  return {
    type: FETCH_ITEM,
    payload: []
  };
};

// Set Action Creators
// To UsersRef
export const setFavorite = (userID, itemID) => {
  return {
    type: SET_FAVORITE,
    payload: []
  };
};

// To ItemRef
export const upvoteItem = (userID, itemID) => {
  return {
    type: UPVOTE_ITEM,
    payload: []
  };
};

// To ItemRef
export const downvoteItem = (userID, itemID) => {
  return {
    type: DOWNVOTE_ITEM,
    payload: []
  };
};
