import { seasonsRef } from '../firebase/references';
import { FETCH_SEASONS } from './types';

export default (fetchSeasons = () => dispatch => {
  seasonsRef.on('value', snapshot => {
    const seasonIDs = Object.keys(snapshot.val());
    const seasons = seasonIDs.map(seasonID => {
      return { [seasonID]: { name: seasonID } };
    });

    dispatch({
      type: FETCH_SEASONS,
      payload: seasons
    });
  });
});
