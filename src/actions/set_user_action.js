import firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { fetchUser } from './';
import { LOGOUT_USER } from './types';
import { rootRef, usersRef, usernamesRef } from '../firebase/references';

export const firebaseLogin = (email, password, callback) => dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      const chainedActions = bindActionCreators({ fetchUser }, dispatch);
      chainedActions.fetchUser();
      callback(null);
    })
    .catch(error => {
      const { code, message } = error;
      callback(message);
    });
};

export const firebaseLogout = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: LOGOUT_USER
      });
    });
};

export const firebaseSignup = (
  email,
  username,
  password,
  callback
) => dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      username = username.toLowerCase();
      const date = new Date();
      const joinDate =
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();

      let updates = {};
      updates['/users/' + user.uid] = { username, joinDate }; // Add to users
      updates['/usernames/' + username] = true; // Add to usernames

      rootRef.update(updates).then(() => {
        const chainedActions = bindActionCreators({ fetchUser }, dispatch);
        chainedActions.fetchUser(user.uid);
        callback(null);
      });

      /*// Add new user to database
      usersRef
        .update({
          [user.uid]: {
            email: user.email,
            username,
            joinDate
          }
        })
        .then(() => {
          const chainedActions = bindActionCreators({ fetchUser }, dispatch);
          chainedActions.fetchUser(user.uid);
          callback(null);
        });

      // Add new username to database
      usernamesRef.update({ [username]: true });*/
    })
    .catch(error => {
      const { code, message } = error;
      callback(message);
    });
};
