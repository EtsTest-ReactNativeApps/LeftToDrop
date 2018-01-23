import { StyleSheet } from 'react-native';

export const defaults = {
  themeColor: 'red',
  contentBackgroundColor: 'white', // e.g. cell background color
  containerBackgroundColor: 'whitesmoke',
  titleFont: 'Futura',
  titleColor: 'white',
  titleStyle: 'italic',
  textFont: 'Courier New',
  textColor: 'black',
  fontSize: 20,
  cellHeight: 50,
  cellContentHeight: 50 * 0.8,
  separatorColor: 'lightgray'
};

export const defaultStyles = StyleSheet.create({
  containerView: {
    backgroundColor: defaults.containerBackgroundColor,
    flex: 1
  },
  separator: {
    backgroundColor: defaults.separatorColor,
    height: StyleSheet.hairlineWidth
  },
  titleText: {
    color: defaults.titleColor,
    fontFamily: defaults.titleFont,
    fontSize: defaults.fontSize,
    fontStyle: defaults.titleStyle,
    textAlign: 'center'
  },
  text: {
    color: defaults.textColor,
    fontFamily: defaults.textFont,
    fontSize: defaults.fontSize
  },
  formRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: defaults.cellContentHeight,
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%'
  },
  textInput: {
    borderWidth: 1,
    height: '100%',
    paddingHorizontal: 5,
    width: '100%'
  }
});
