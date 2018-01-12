import { seasonsRef } from '../firebase/references';
import { FETCH_SEASONS } from './types';

export default (fetchSeasons = () => dispatch => {
  seasonsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_SEASONS,
      payload: snapshot.val()
    });
  });
});
