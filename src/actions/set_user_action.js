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
      // Dispatch logout action to erase all redux states relating to currentUser
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
        chainedActions.fetchUser();
        callback(null);
      });
    })
    .catch(error => {
      const { code, message } = error;
      callback(message);
    });
};

const getCurrentUser = () => firebase.auth().currentUser;

export const setUsername = (username, oldUsername, callback) => dispatch => {
  const user = getCurrentUser();
  if (user) {
    let updates = {};
    updates['/users/' + user.uid + '/username/'] = username; // Add to users
    updates['/usernames/' + username] = true; // Add to usernames
    updates['/usernames/' + oldUsername] = null;

    rootRef
      .update(updates)
      .then(() => {
        // Success
        const chainedActions = bindActionCreators({ fetchUser }, dispatch);
        chainedActions.fetchUser();
        callback(null);
      })
      .catch(error => {
        // Failed
        const { code, message } = error;
        callback(message);
      });
  } else {
    callback('Failed to update username.');
  }
};

export const setEmail = (email, callback) => dispatch => {
  const user = getCurrentUser();
  if (user) {
    user
      .updateEmail(email)
      .then(() => {
        // Success
        const chainedActions = bindActionCreators({ fetchUser }, dispatch);
        chainedActions.fetchUser();
        callback(null);
      })
      .catch(error => {
        // Failed
        const { code, message } = error;
        callback(message);
      });
  } else {
    callback('Failed to update email.');
  }
};

export const setPassword = (password, callback) => dispatch => {
  const user = getCurrentUser();
  if (user) {
    user
      .updatePassword(password)
      .then(() => {
        // Success
        const chainedActions = bindActionCreators({ fetchUser }, dispatch);
        chainedActions.fetchUser();
        callback(null);
      })
      .catch(error => {
        // Failed
        const { code, message } = error;
        callback(message);
      });
  } else {
    callback('Failed to update password.');
  }
};

export const deleteAccount = callback => dispatch => {
  const user = getCurrentUser();
  if (user) {
    user
      .delete()
      .then(() => {
        // Success
        const chainedActions = bindActionCreators({ fetchUser }, dispatch);
        chainedActions.fetchUser();
        callback(null);
      })
      .catch(error => {
        // Failed
        const { code, message } = error;
        callback(message);
      });
  } else {
    callback('Failed to delete account.');
  }
};
