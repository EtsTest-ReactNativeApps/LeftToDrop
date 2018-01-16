import React, { Component } from 'react';
import { View } from 'react-native';
import { defaultStyles } from '../styles';

export default (SeparatorView = () => {
  return <View style={defaultStyles.separator} />;
});
