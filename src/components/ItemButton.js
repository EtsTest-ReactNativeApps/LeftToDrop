import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { itemButtonStyleCreator as styleCreator } from '../styles';

class ItemButton extends Component {
  render() {
    const { label, onPress, color, marginLeft, marginRight } = this.props;
    const style = styleCreator(color, marginLeft, marginRight);
    return (
      <TouchableOpacity style={style.button} onPress={onPress}>
        <Text style={style.text}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export default ItemButton;
