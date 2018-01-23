import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  defaultStyles,
  buttonStylesCreator as stylesCreator
} from '../../styles';

class ItemButton extends Component {
  render() {
    const { label, onPress, color, marginLeft, marginRight } = this.props;
    const styles = stylesCreator(color, marginLeft, marginRight);

    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={defaultStyles.titleText}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

export default ItemButton;
