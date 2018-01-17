import Firebase from 'firebase';
import { firebaseConfig } from '../config/dev';

const firebaseApp = Firebase.initializeApp(firebaseConfig);

export const rootRef = Firebase.database().ref();
export const metadataRef = rootRef.child('_metadata');
export const seasonsRef = rootRef.child('seasons');
export const categoriesRef = rootRef.child('categories');
export const itemsRef = rootRef.child('items');
export const itemRef = rootRef.child('item');
export const usersRef = rootRef.child('users');
export const favoritesRef = rootRef.child('favorites');
export const upvotedItemsRef = rootRef.child('upvotedItems');
export const downvotedItemsRef = rootRef.child('downvotedItems');
