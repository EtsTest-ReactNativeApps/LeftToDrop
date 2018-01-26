import { FETCH_USER_VOTE_ITEM_IDS, LOGOUT_USER } from '../actions/types';

// Returns { upvotes: [id1, id2, ...], downvotes: [id1, id2, ...] }
export default (userVoteItemIDsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_VOTE_ITEM_IDS:
      console.log('USERVOTEITEMIDSREDUCER:' + JSON.stringify(action.payload));
      return action.payload || {};
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
});
