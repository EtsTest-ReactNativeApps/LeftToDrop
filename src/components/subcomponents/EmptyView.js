import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { defaultStyles } from '../../styles';

class EmptyView extends Component {
  render() {
    return (
      <View style={defaultStyles.containerView}>
        <Text style={[defaultStyles.text, { margin: 15, textAlign: 'center' }]}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

export default EmptyView;
