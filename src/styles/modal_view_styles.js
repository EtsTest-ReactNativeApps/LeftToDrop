import { Dimensions, StyleSheet } from 'react-native';
import { defaults, defaultStyles } from './defaults';

export const modalViewStyles = StyleSheet.create({
  // Darkened containing view
  modalContainerView: {
    alignItems: 'center',
    backgroundColor: '#00000080',
    flex: 1
  },
  // Actual popup window
  modalView: {
    //aspectRatio: 16 / 9,
    backgroundColor: defaults.contentBackgroundColor,
    borderRadius: 10,
    padding: 10,
    top: Dimensions.get('window').height / 4,
    width: '90%'
  },
  // Modal's Text, TextInput, and Button positioning
  content: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between', //'center'
    paddingHorizontal: 2.5
  }
});
