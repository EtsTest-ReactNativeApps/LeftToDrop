import { Dimensions, StyleSheet } from 'react-native';
import { defaults } from './defaults';

export const loginViewStyles = StyleSheet.create({
  content: {
    marginHorizontal: 25,
    marginTop: 35,
    marginBottom: 15
  },
  inputDescription: {
    justifyContent: 'flex-end',
    height: defaults.cellContentHeight * 0.6
  },
  errorText: { color: 'red', fontSize: 15 }
});
