import { itemsRef } from '../firebase/references';
import { FETCH_ITEM } from './types';

export default (fetchItem = itemID => dispatch => {
  itemsRef.child(itemID).on('value', snapshot => {
    dispatch({
      type: FETCH_ITEM,
      payload: snapshot.val()
    });
  });
});
