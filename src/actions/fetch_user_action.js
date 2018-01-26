import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { usersRef } from '../firebase/references';
import {
  fetchFavorites,
  fetchUserVoteItemIDs,
  firebaseAnonymousLogin
} from '.';
import { FETCH_USER } from './types';

export const listenForAuthStateChange = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => loadUserData(user, dispatch));
};

// Will be called after user data is edited (i.e. username/email change)
export const fetchUser = () => dispatch => {
  const currentUser = firebase.auth().currentUser;
  loadUserData(currentUser, dispatch);
};

// Called whenever authStateChanges or when fetchUser() is explicitly called
const loadUserData = (user, dispatch) => {
  if (user) {
    const userID = user.uid;

    usersRef.child(userID).on('value', snapshot => {
      const userObject = snapshot.val() || {};
      userObject['id'] = userID;
      userObject['auth'] = user;

      dispatch({
        type: FETCH_USER,
        payload: userObject
      });
    });

    const chainedActions = bindActionCreators(
      { fetchFavorites, fetchUserVoteItemIDs },
      dispatch
    );
    for (action in chainedActions) {
      chainedActions[action](userID);
    }
  } else {
    /*// No user is logged in
    return dispatch({
      type: FETCH_USER,
      payload: {}
    });*/

    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        const { code, message } = error;
        console.log('\n\nANONYMOUS LOGIN ERROR: ' + message + '\n\n');
      });
  }
};
