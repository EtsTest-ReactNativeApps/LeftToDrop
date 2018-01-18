import { bindActionCreators } from 'redux';
import { usersRef } from '../firebase/references';
import { fetchFavorites } from './fetch_favorites_action';
import {
  fetchUpvotedItemIDs,
  fetchDownvotedItemIDs
} from './fetch_voted_items_action';
import { FETCH_USER } from './types';

export const fetchUser = userID => dispatch => {
  usersRef.child(userID).on('value', snapshot => {
    const userObject = snapshot.val() || {};
    userObject['id'] = snapshot.key;

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
};
