import { usersRef } from '../firebase/references';
import { FETCH_USER } from './types';

export default (fetchUser = userID => dispatch => {
  usersRef.child(userID).on('value', snapshot => {
    const userObject = snapshot.val() || {};
    dispatch({
      type: FETCH_USER,
      payload: userObject
    });
  });
});
