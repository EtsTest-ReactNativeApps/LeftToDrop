import { favoritesRef } from '../firebase/references';

export const favoriteItem = (itemID, userID) => dispatch => {
  favoritesRef.child(userID).update({ [itemID]: true });
};

export const unfavoriteItem = (itemID, userID) => dispatch => {
  favoritesRef.child(userID + '/' + itemID).remove();
};
