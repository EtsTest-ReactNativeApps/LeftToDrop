import { favoritesRef } from '../firebase/references';

export const toggleFavoriteItem = (itemID, userID, value) => dispatch => {
  favoritesRef.child(userID).update({ [itemID]: value });
};
