import { usernamesRef } from '../firebase/references';
import { isAlphaNumeric } from '../utility';

export const usernameExists = username => {
  username = username.toLowerCase();
  return usernamesRef.child(username).once('value');
};

export const validateUsername = username => {
  if (username.length < 3) return 'Username must be at least 3 characters.';
  else if (!isAlphaNumeric(username)) return 'Username must be alphanumeric.';
  else return null;
};

export const validatePassword = password => {
  return password.length < 8 ? 'Password must be at least 8 characters.' : null;
};

export const validatePasswords = (password, verifyPassword) => {
  let errorMessage = validatePassword(password);
  if (!errorMessage)
    errorMessage = password != verifyPassword ? "Passwords don't match." : null;
  return errorMessage;
};
