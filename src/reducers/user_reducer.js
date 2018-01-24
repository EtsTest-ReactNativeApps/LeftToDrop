import { FETCH_USER, LOGOUT_USER } from '../actions/types';

export default (userReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || {};
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
});
