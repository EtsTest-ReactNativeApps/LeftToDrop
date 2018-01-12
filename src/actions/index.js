import { FETCH_FAVORITES } from './types';
export const fetchFavorites = userID => {
  return {
    type: FETCH_FAVORITES,
    payload: []
  };
};

// From ItemsRef
import { FETCH_ITEM } from './types';
export const fetchItem = itemID => {
  return {
    type: FETCH_ITEM,
    payload: []
  };
};

// Set Action Creators
// To UsersRef
import { SET_FAVORITE } from './types';
export const setFavorite = (userID, itemID) => {
  return {
    type: SET_FAVORITE,
    payload: []
  };
};

// To ItemRef
import { UPVOTE_ITEM } from './types';
export const upvoteItem = (userID, itemID) => {
  return {
    type: UPVOTE_ITEM,
    payload: []
  };
};

// To ItemRef
import { DOWNVOTE_ITEM } from './types';
export const downvoteItem = (userID, itemID) => {
  return {
    type: DOWNVOTE_ITEM,
    payload: []
  };
};
