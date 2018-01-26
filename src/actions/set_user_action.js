import firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { fetchUser } from './';
import { LOGOUT_USER } from './types';
import { rootRef, usersRef, userVotesRef } from '../firebase/references';

const getCurrentUser = () => firebase.auth().currentUser;

export const firebaseLogin = (email, password, callback) => dispatch => {
  // Delete anonymous user if logging into another account
  const user = getCurrentUser;
  console.log('USER: ' + user);
  if (user.isAnonymous) {
    console.log('USER IS ANONYMOUS');
    const chainedActions = bindActionCreators({ deleteAccount }, dispatch);
    chainedActions.deleteAccount(callback);
  }

  // Proceed with signin
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
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  firebase
    .auth()
    .currentUser.linkWithCredential(credential)
    //firebase.auth().createUserWithEmailAndPassword(email, password) // Old signup w/o anonymous conversion
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

export const setUsername = (username, oldUsername, callback) => dispatch => {
  const user = getCurrentUser();

  if (user) {
    username = username.toLowerCase();

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
    const userID = user.uid;

    const usernamePromise = usersRef.child(userID + '/username/').once('value');
    const userVotesPromise = userVotesRef.child(userID).once('value');

    Promise.all([usernamePromise, userVotesPromise])
      .then(results => {
        const username = results[0] ? results[0].val() : null;
        const userVotes = results[1] ? results[1].val() || {} : {};

        const upvotedItemIDs = Object.keys(userVotes.upvotes || {});
        const downvotedItemIDs = Object.keys(userVotes.downvotes || {});

        // Delete user from auth database
        user.delete().then(() => {
          // If successful, delete user-related data from database
          let updates = {};
          updates['/users/' + userID] = null; // Remove from /users/
          if (username) updates['/usernames/' + username] = null;
          updates['/userFavorites/' + userID] = null; // Remove from /userFavorites/
          updates['/userVotes/' + userID] = null; // Remove from /userVotes/

          // Remove from /itemVotes/
          for (index in upvotedItemIDs) {
            const itemID = upvotedItemIDs[index];
            updates['/itemVotes/' + itemID + '/upvotes/' + userID] = null;
          }
          for (index in downvotedItemIDs) {
            const itemID = downvotedItemIDs[index];
            updates['/itemVotes/' + itemID + '/downvotes/' + userID] = null;
          }
          rootRef
            .update(updates)
            .then(() => {
              // Success
              const chainedActions = bindActionCreators(
                { fetchUser },
                dispatch
              );
              chainedActions.fetchUser();
              callback(null);
            })
            .catch(error => {
              // Failed
              const { code, message } = error;
              callback(message);
            });
        });
      })
      .catch(error => {
        const { code, message } = error;
        callback(message);
      });
  } else {
    callback('Failed to delete user.');
  }
};
