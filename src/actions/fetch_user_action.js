import { usersRef } from '../firebase/references';
import { FETCH_USER } from './types';

export default (fetchUser = userID => dispatch => {
  usersRef.child(userID).on('value', snapshot => {
    console.log('USERSNAPSHOTVAL: ', snapshot.val());
    dispatch({
      type: FETCH_USER,
      payload: snapshot.val()
    });
  });
});
