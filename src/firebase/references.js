import Firebase from 'firebase';
import { firebaseConfig } from '../config/dev';

const firebaseApp = Firebase.initializeApp(firebaseConfig);

const rootRef = Firebase.database().ref();
export const favoritesRef = rootRef.child('favorites');
export const seasonsRef = rootRef.child('seasons');
export const categoriesRef = rootRef.child('categories');
export const itemsRef = rootRef.child('items');
export const itemRef = rootRef.child('item');
