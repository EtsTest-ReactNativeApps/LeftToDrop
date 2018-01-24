import Firebase from 'firebase';
import { usernamesRef } from './references';

export const usernameExists = username => {
  username = username.toLowerCase();
  return usernamesRef.child(username).once('value');
};
