import React, { Component } from 'react';
import { Text } from 'react-native';
import { defaultStyles } from '../../styles';

export default (ErrorMessage = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <Text style={[defaultStyles.text, { color: 'red', fontSize: 15 }]}>
        {errorMessage}
      </Text>
    );
  } else return null;
});
