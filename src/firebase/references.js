import Firebase from 'firebase';
import { firebaseConfig } from '../config/dev';

/*/,,,
import functions from 'firebase-functions';
import admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

export const updateItemVoteCounts = functions.database
  .ref('items/{itemID}/upvotes')
  .onWrite(event => {
    console.log('ON_WRITE CALLED');
    return itemsRef.child(itemID + '/' + itemSubpath).transaction(current => {
      if (event.data.exists() && !event.data.previous.exists()) {
        return (current || 0) + 1;
      } else if (!event.data.exists() && event.data.previous.exists()) {
        return (current || 0) - 1;
      }
    });
  });
//*/

const firebaseApp = Firebase.initializeApp(firebaseConfig);

export const rootRef = Firebase.database().ref();
export const metadataRef = rootRef.child('_metadata');
export const seasonsRef = rootRef.child('seasons');
export const categoriesRef = rootRef.child('categories');
export const itemsRef = rootRef.child('items');
export const itemRef = rootRef.child('item');
export const usersRef = rootRef.child('users');
export const usernamesRef = rootRef.child('usernames');
export const favoritesRef = rootRef.child('favorites');
export const upvotedItemsRef = rootRef.child('upvotedItems');
export const downvotedItemsRef = rootRef.child('downvotedItems');
