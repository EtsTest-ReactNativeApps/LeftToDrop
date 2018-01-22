import { StyleSheet } from 'react-native';
import { defaults, defaultStyles } from './defaults';

export const modalViewStyles = StyleSheet.create({
  // Darkened containing view
  modalContainerView: {
    alignItems: 'center',
    backgroundColor: '#00000080',
    justifyContent: 'center'
  },
  // Actual popup window
  modalView: {
    aspectRatio: 16 / 9,
    backgroundColor: defaults.contentBackgroundColor,
    borderRadius: 10,
    padding: 10,
    width: '90%'
  },
  // Modal's Text, TextInput, and Button positioning
  content: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between' //'center'
  },
  // Field styling; top row of modal
  description: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 2.5,
    width: '100%'
  },
  // View containing TextInput
  textField: {
    height: defaults.cellContentHeight,
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%'
  },
  // TextInput styling; middle rows of modal
  textInput: {
    borderWidth: 1,
    height: '100%',
    paddingHorizontal: 5
  },
  // Row containing horizontally aligned buttons; bottom row of modal
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2.5
  }
});
