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
  text: {
    color: defaults.textColor,
    fontFamily: defaults.textFont,
    fontSize: defaults.fontSize
  }
});
