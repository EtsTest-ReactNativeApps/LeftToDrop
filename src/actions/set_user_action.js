import firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { fetchUser } from './';
import { usersRef } from '../firebase/references';

export const firebaseLogin = (email, password) => dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      const chainedActions = bindActionCreators({ fetchUser }, dispatch);
      chainedActions.fetchUser(user.uid);
      return null;
    })
    .catch(error => {
      const { code, message } = error;
      return message;
    });
};

export const firebaseSignup = (email, password) => dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      usersRef.set({
        [user.uid]: {
          email: user.email,
          username: user.username
        }
      });
      const chainedActions = bindActionCreators({ fetchUser }, dispatch);
      chainedActions.fetchUser(user.uid);
      return { signupError: null };
    })
    .catch(error => {
      const { code, message } = error;
      return { signupError: message };
    });
};
