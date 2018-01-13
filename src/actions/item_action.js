import { favoritesRef } from '../firebase/references';

export const favoriteItem = (itemID, userID) => dispatch => {
  favoritesRef.child(userID).push({ [itemID]: true });
};

export const unfavoriteItem = (itemID, userID) => dispatch => {
  return favoritesRef
    .child(userID)
    .child(itemID)
    .remove();
};

/*export default downvoteItem = (itemID, userID) => dispatch => {

}

export default setFavorite = (itemID, userID) => dispatch => {

}*/
