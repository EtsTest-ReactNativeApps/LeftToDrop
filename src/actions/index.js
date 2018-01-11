import * as firebase from 'firebase';
import { firebaseConfig } from '../config/dev';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const FETCH_SEASONS = 'FETCH_SEASONS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEM = 'FETCH_ITEM';

// Fetch Action Creators
// From FavoritesRef
export const fetchFavorites = userID => {
  return {
    type: FETCH_FAVORITES,
    payload: []
  };
};

// From SeasonsRef
export const fetchSeasons = () => {
  return {
    type: FETCH_SEASONS,
    payload: [{ name: 'S1' }, { name: 'S2' }, { name: 'S3' }]
  };
};

// From SeasonsRef
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
