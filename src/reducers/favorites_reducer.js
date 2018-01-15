import _ from 'lodash';
import {
  FETCH_FAVORITES,
  FAVORITE_ITEM,
  UNFAVORITE_ITEM
} from '../actions/types';
import { itemsRef } from '../firebase/references';

export const favoriteItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      return action.payload;
    default:
      return state;
  }
};

export const favoriteItemsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      const itemIDs = Object.keys(action.payload);

      let items = [];
      itemIDs.forEach((itemID, index) => {
        // Gather corresponding Item data
        itemsRef.child(itemID).once('value', snapshot => {
          item = { [snapshot.key]: snapshot.val() };
          items.push(item);

          // Dispatch after last Item only
          if (index == itemIDs.length - 1) {
            console.log('ITEMS: ' + JSON.stringify(items));
            return items;
          }
        });
      });
    default:
      return state;
  }
};
