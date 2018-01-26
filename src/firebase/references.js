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
export const usernamesRef = rootRef.child('usernames');
export const favoritesRef = rootRef.child('userFavorites');
export const userVotesRef = rootRef.child('userVotes');
export const itemVotesRef = rootRef.child('itemVotes');
