import { favoritesRef } from '../firebase/references';
import { FAVORITE_ITEM, UNFAVORITE_ITEM } from './types';

export const favoriteItem = (itemID, userID) => dispatch => {
  favoritesRef.child(userID).push({ [itemID]: true });
  dispatch({
    type: FAVORITE_ITEM,
    payload: itemID
  });
};

export const unfavoriteItem = (itemID, userID) => dispatch => {
  favoritesRef
    .child(userID)
    .child(itemID)
    .remove();
  dispatch({
    type: UNFAVORITE_ITEM,
    payload: itemID
  });
};

/*export default downvoteItem = (itemID, userID) => dispatch => {

}

export default setFavorite = (itemID, userID) => dispatch => {

}*/
