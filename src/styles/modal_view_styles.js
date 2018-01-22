import { StyleSheet } from 'react-native';
import { defaults, defaultStyles } from './defaults';

export const modalViewStyles = StyleSheet.create({
  modalContainerView: {
    alignItems: 'center',
    backgroundColor: '#00000080',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  modalView: {
    aspectRatio: 16 / 9,
    backgroundColor: defaults.contentBackgroundColor,
    borderRadius: 10,
    padding: 15,
    width: '90%'
  }
});
