import * as firebase from 'firebase';
import { firebaseConfig } from '../config/keys';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const rootRef = firebase.database().ref();

export default {
  seasons: rootRef.child('seasons'),
  categoriesRef: rootRef.child('categories'),
  itemsRef: rootRef.child('items'),
  usersRef: rootRef.child('users'),
  favoritesRef: rootRef.child('favorites')
};
