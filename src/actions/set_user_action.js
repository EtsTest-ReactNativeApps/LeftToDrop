import firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { fetchUser } from './';
import { LOGOUT_USER } from './types';
import { usersRef } from '../firebase/references';

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
      const date = new Date();
      const joinDate =
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();

      // Add new user to database
      usersRef
        .set({
          [user.uid]: {
            email: user.email,
            username: user.username,
            joinDate
          }
        })
        .then(() => {
          const chainedActions = bindActionCreators({ fetchUser }, dispatch);
          chainedActions.fetchUser(user.uid);
          callback(null);
        });
    })
    .catch(error => {
      const { code, message } = error;
      callback(message);
    });
};
