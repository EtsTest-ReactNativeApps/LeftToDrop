import { bindActionCreators } from 'redux';
import { usersRef } from '../firebase/references';
import { fetchFavorites } from './fetch_favorites_action';
import {
  fetchUpvotedItemIDs,
  fetchDownvotedItemIDs
} from './fetch_voted_items_action';
import { FETCH_USER } from './types';

import firebase from 'firebase';

export const fetchUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      const userID = user.uid;

      usersRef.child(userID).on('value', snapshot => {
        const userObject = snapshot.val() || null;
        if (userObject) {
          userObject['id'] = snapshot.key;
          userObject['email'] = firebase.auth().currentUser.email;
        }

        dispatch({
          type: FETCH_USER,
          payload: userObject
        });
      });

      // Bind fetch actions to dispatch
      const chainedActions = bindActionCreators(
        { fetchFavorites, fetchUpvotedItemIDs, fetchDownvotedItemIDs },
        dispatch
      );
      // Call each fetch action
      for (action in chainedActions) {
        chainedActions[action](userID);
      }
    } else {
      // No user is logged in
      return dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};
