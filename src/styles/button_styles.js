import { StyleSheet } from 'react-native';
import { defaults } from './defaults';

export const buttonStylesCreator = (color, marginLeft = 0, marginRight = 0) => {
  return StyleSheet.create({
    button: {
      backgroundColor: color,
      borderRadius: 3,
      flex: 1,
      height: defaults.cellContentHeight,
      justifyContent: 'center',
      marginLeft: marginLeft,
      marginRight: marginRight
    },
    text: {
      color: defaults.titleColor,
      fontFamily: defaults.titleFont,
      fontStyle: defaults.titleStyle,
      fontSize: 20,
      textAlign: 'center'
    }
  });
};
