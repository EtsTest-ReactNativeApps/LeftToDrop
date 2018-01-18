import { itemsRef } from '../firebase/references';
import { FETCH_ITEM } from './types';

export const fetchItem = itemID => dispatch => {
  if (!itemID) {
    return {
      type: FETCH_ITEM,
      payload: null
    };
  }

  itemsRef.child(itemID).on('value', snapshot => {
    dispatch({
      type: FETCH_ITEM,
      payload: snapshot.val()
    });
  });
};
