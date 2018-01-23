import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  Animated,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { connect } from 'react-redux';
import ItemButton from '../subcomponents/ItemButton.js';
import { isAlphaNumeric } from '../../utility';
import { defaultStyles } from '../../styles';

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      view: 'login',
      fadeAnim: new Animated.Value(1),
      keyboardHeight: 0
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow(event) {
    const keyboardHeight = event.endCoordinates.height;
    this.setState({ keyboardHeight });
  }

  keyboardDidHide() {
    this.setState({ keyboardHeight: 0 });
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
    const { username, email, password, fadeAnim } = this.state;

    return (
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Username or Email</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={username || email || ''}
            onChangeText={text => {
              if (text.includes('@')) {
                var key = 'email';
                var otherKey = 'username';
              } else {
                var key = 'username';
                var otherKey = 'email';
              }

              this.setState({ [key]: text, [otherKey]: null });
            }}
          />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={password}
            onChange={password => this.setState({ password })}
          />
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
    const { username, email, password, verifyPassword, fadeAnim } = this.state;

    return (
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Username</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={username}
            onChange={username => {
              // Don't change username unless alphanumeric
              if (isAlphaNumeric(username)) {
                this.setState({
                  username,
                  error: ''
                });
              } else {
                this.setState({ error: 'Username must be alphanumeric.' });
              }
            }}
          />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Email</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={email}
            onChange={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={password}
            onChange={password => this.setState({ password })}
          />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Verify Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={verifyPassword}
            onChange={verifyPassword => this.setState({ verifyPassword })}
          />
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
    const { fadeAnim, keyboardHeight, view } = this.state;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();

    return (
      <View style={defaultStyles.containerView}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ marginBottom: keyboardHeight }}
          scrollEnabled={keyboardHeight ? true : false}
        >
          {(() => {
            if (view == 'login') {
              return this.loginView.bind(this)();
            } else {
              return this.signupView.bind(this)();
            }
          })()}
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;

import { Dimensions, StyleSheet } from 'react-native';
import { defaults } from '../../styles'; ///CHANGE WHEN MOVED TO STYLES INDEX

styles = StyleSheet.create({
  content: {
    marginHorizontal: 25,
    marginTop: 35,
    marginBottom: 15
  },
  inputDescription: {
    justifyContent: 'flex-end',
    height: defaults.cellContentHeight * 0.6
  }
});
