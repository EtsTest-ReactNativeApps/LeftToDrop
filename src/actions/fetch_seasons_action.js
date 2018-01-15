import { seasonsRef } from '../firebase/references';
import { FETCH_SEASONS } from './types';

export default (fetchSeasons = () => dispatch => {
  // Get all Seasons
  seasonsRef.on('value', snapshot => {
    let seasons = [];

    snapshot.forEach(childSnapshot => {
      let season = childSnapshot.val();
      let key = childSnapshot.key;
      seasons.push({ [key]: season });
    });

    dispatch({
      type: FETCH_SEASONS,
      payload: seasons
    });
  });
});
