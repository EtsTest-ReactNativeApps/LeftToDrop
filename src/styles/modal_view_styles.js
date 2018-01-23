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
    padding: 2.5
  },
  contentRow: {
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    height: defaults.cellContentHeight,
    margin: 2.5,
    width: '100%'
  },
  // Field styling; top row of modal
  description: {
    alignItems: 'center',
    height: defaults.cellContentHeight,
    justifyContent: 'center',
    marginBottom: 2.5,
    width: '100%'
  },
  // View containing TextInput
  inputRow: {
    alignItems: 'center',
    height: defaults.cellContentHeight,
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%'
  },
  // TextInput styling; middle rows of modal
  textInput: {
    borderWidth: 1,
    height: '100%',
    paddingHorizontal: 5,
    width: '100%'
  },
  // Row containing horizontally aligned buttons; bottom row of modal
  buttonRow: {
    flexDirection: 'row',
    height: defaults.cellContentHeight,
    justifyContent: 'center',
    marginTop: 2.5
  }
});
