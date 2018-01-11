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

// From SeasonsRef
const seasonsRef = rootRef.child('seasons');

export const fetchxSeasons = () => dispatch => {
  console.log('FETCHSEASONS');
  seasonsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_SEASONS,
      payload: snapshot.val()
    });
  });
};

const fetchedFromSeasonsRef = {
  SEASON_ID_X: {
    CATEGORY_ID_X: true
  },
  FW12: true,
  SS13: true
};

export const fetchSeasons = () => {
  return {
    type: FETCH_SEASONS,
    payload: fetchedFromSeasonsRef
  };
};

export const fetchCategories = seasonID => {
  return {
    type: FETCH_CATEGORIES,
    payload: []
  };
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
