import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  Animated,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import ItemButton from '../subcomponents/ItemButton.js';
import { defaultStyles } from '../../styles';

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      view: 'login',
      fadeAnim: new Animated.Value(1)
    };
  }

  login() {
    console.log('LOGIN');
  }

  signup() {
    console.log('SIGNUP');
  }

  dissolveAnimate() {
    const { fadeAnim, view } = this.state;
    const newView = view == 'login' ? 'signup' : 'login';

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50
    }).start(() => {
      this.setState({
        fadeAnim: new Animated.Value(0),
        view: newView
      });
    });
  }

  loginView() {
    const { fadeAnim } = this.state;

    return (
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Username or Email</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput style={styles.textInput} />
        </View>
        <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
          <ItemButton onPress={this.login} label={'Login'} color={'red'} />
        </View>
        <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
          <ItemButton
            onPress={this.dissolveAnimate.bind(this)}
            label={'Signup'}
            color={'black'}
          />
        </View>
      </Animated.View>
    );
  }

  signupView() {
    const { fadeAnim } = this.state;

    return (
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Username</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Email</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Confirm Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput style={styles.textInput} />
        </View>
        <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
          <ItemButton
            onPress={this.dissolveAnimate.bind(this)}
            label={'Login'}
            color={'red'}
          />
        </View>
        <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
          <ItemButton onPress={this.signup} label={'Signup'} color={'black'} />
        </View>
      </Animated.View>
    );
  }

  render() {
    const { fadeAnim, view } = this.state;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();

    return (
      <View style={[defaultStyles.containerView, styles.containerView]}>
        {(() => {
          if (view == 'login') {
            return this.loginView.bind(this)();
          } else {
            return this.signupView.bind(this)();
          }
        })()}
      </View>
    );
  }
}

export default LoginScreen;

import { Dimensions, StyleSheet } from 'react-native';
import { defaults } from '../../styles'; ///CHANGE WHEN MOVED TO STYLES INDEX

styles = StyleSheet.create({
  containerView: {
    paddingHorizontal: 25,
    paddingVertical: 35
  },
  content: {
    width: '100%'
  },
  inputDescription: {
    justifyContent: 'flex-end',
    height: defaults.cellContentHeight * 0.6
  },
  textInput: {
    borderWidth: 1,
    height: '100%',
    paddingHorizontal: 5,
    width: '100%'
  }
});
