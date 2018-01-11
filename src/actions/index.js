import * as firebase from 'firebase';
import { firebaseConfig } from '../config/dev';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const FETCH_SEASONS = 'FETCH_SEASONS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEM = 'FETCH_ITEM';

export const fetchReference = () => {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firebaseRef = firebaseApp.database().reference();

  return {
    type: FETCH_REFERENCE,
    payload: firebaseRef
  };
};

export const fetchSeasons = () => {
  /*const seasonsRef = await firebaseRef.child('Seasons');
  let seasons = [];

  await seasonsRef.once('value', snapshot => {
    snapshot.forEach(childSnapshot => {
      var seasonName = childSnapshot.key;
      seasons.push(seasonName);
    });
    dispatch({
      type: FETCH_SEASONS,
      payload: seasons
    });
  });*/

  return {
    type: FETCH_SEASONS,
    payload: [{ name: 'S1' }, { name: 'S2' }, { name: 'S3' }]
  };
};
