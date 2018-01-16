import { metadataRef } from '../firebase/references';
import { FETCH_METADATA } from './types';

export const fetchMetadata = () => dispatch => {
  metadataRef.on('value', snapshot => {
    dispatch({
      type: FETCH_METADATA,
      payload: snapshot.val()
    });
  });
};
