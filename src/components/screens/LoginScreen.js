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
import { isAlphaNumeric, isValidEmail } from '../../utility';
import { defaultStyles } from '../../styles';

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
      inputFocus: 'username',
      view: 'login',
      fadeAnim: new Animated.Value(1),
      keyboardHeight: 0,
      errorMessage: ''
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
    this.setState({ keyboardHeight: 0, inputFocus: null });
  }

  login() {
    console.log('LOGIN');
    Keyboard.dismiss();
  }

  signup() {
    if (this.validateSignup.bind(this)()) {
      console.log('VALID FORM, SIGN UP');
    } else {
      Keyboard.dismiss();
    }
  }

  validateSignup() {
    const { username, email, password, verifyPassword } = this.state;

    console.log(
      'VALIDATE, USERNAME: ' +
        username +
        ', EMAIL: ' +
        email +
        ', PASSWORD: ' +
        password +
        ', VERIFYPASSWORD: ' +
        verifyPassword
    );

    let signupUsernameError = null;
    let signupEmailError = null;
    let signupPasswordError = null;
    let signupVerifyPasswordError = null;

    // Validate username
    if (username.length < 3) {
      signupUsernameError = 'Username must be at least 3 characters.';
    } else if (false) {
      signupUsernameError = 'Username is already in use.';
    }

    // Validate email
    if (!isValidEmail(email)) {
      signupEmailError = 'Email format is not valid.';
    } else if (false) {
      signupEmailError = 'Email is already in use.';
    }

    // Validate password
    if (password.length < 8) {
      signupPasswordError = 'Password must be at least 8 characters.';
    }
    // Validate verifyPassword
    if (password != verifyPassword) {
      signupVerifyPasswordError = "Passwords don't match.";
    }

    this.setState({
      signupUsernameError,
      signupEmailError,
      signupPasswordError,
      signupVerifyPasswordError
    });

    console.log(
      'ERRORS, USERNAME: ' +
        signupUsernameError +
        ', EMAIL: ' +
        signupEmailError +
        ', PASSWORD: ' +
        signupPasswordError +
        ', VPASSWORD: ' +
        signupVerifyPasswordError
    );

    // Return true if all errors are null
    return !(
      signupUsernameError ||
      signupEmailError ||
      signupPasswordError ||
      signupVerifyPasswordError
    );
  }

  presentErrorMessage(errorMessage) {
    if (errorMessage) {
      return (
        <Text style={[defaultStyles.text, styles.errorText]}>
          {' '}
          {errorMessage}{' '}
        </Text>
      );
    }
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
            // Values
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={username || email}
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
            onSubmitEditing={() => this.loginPasswordRef.focus()}
            // Configuration
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            secureTextEntry={false}
          />
        </View>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            // Values
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={password}
            ref={loginPasswordRef => (this.loginPasswordRef = loginPasswordRef)}
            onSubmitEditing={this.login.bind(this)}
            onChangeText={password => this.setState({ password })}
            // Configuration
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>
        <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
          <ItemButton
            onPress={this.login.bind(this)}
            label={'Login'}
            color={'red'}
          />
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

    const {
      signupUsernameError,
      signupEmailError,
      signupPasswordError,
      signupVerifyPasswordError
    } = this.state;

    return (
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Username</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            // Values
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={username}
            onChangeText={username => {
              // Don't change username unless alphanumeric
              if (isAlphaNumeric(username)) {
                this.setState({
                  username,
                  signupUsernameError: null
                });
              } else {
                this.setState({
                  signupUsernameError: 'Username must be alphanumeric.'
                });
              }
            }}
            onSubmitEditing={() => this.signupEmailRef.focus()}
            // Configuration
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            maxLength={20}
            secureTextEntry={false}
          />
        </View>
        {this.presentErrorMessage(signupUsernameError)}
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Email</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            // Values
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={email}
            ref={signupEmailRef => (this.signupEmailRef = signupEmailRef)}
            onChangeText={email =>
              this.setState({ email, signupEmailError: null })
            }
            onSubmitEditing={() => this.signupPasswordRef.focus()}
            // Configuration
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={40}
            secureTextEntry={false}
          />
        </View>
        {this.presentErrorMessage(signupEmailError)}
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            // Values
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={password}
            ref={signupPasswordRef =>
              (this.signupPasswordRef = signupPasswordRef)
            }
            onChangeText={password =>
              this.setState({ password, signupPasswordError: null })
            }
            onSubmitEditing={() => this.signupVerifyPasswordRef.focus()}
            // Configuration
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>
        {this.presentErrorMessage(signupPasswordError)}
        <View style={styles.inputDescription}>
          <Text style={defaultStyles.text}>Verify Password</Text>
        </View>
        <View style={defaultStyles.formRow}>
          <TextInput
            // Values
            style={[defaultStyles.text, defaultStyles.textInput]}
            value={verifyPassword}
            ref={signupVerifyPasswordRef =>
              (this.signupVerifyPasswordRef = signupVerifyPasswordRef)
            }
            onChangeText={verifyPassword =>
              this.setState({ verifyPassword, signupVerifyPasswordError: null })
            }
            onSubmitEditing={this.signup.bind(this)}
            // Configuration
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>
        {this.presentErrorMessage(signupVerifyPasswordError)}
        <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
          <ItemButton
            onPress={this.signup.bind(this)}
            label={'Signup'}
            color={'red'}
          />
        </View>
        <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
          <ItemButton
            onPress={this.dissolveAnimate.bind(this)}
            label={'Login'}
            color={'black'}
          />
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
  },
  errorText: { color: 'red', fontSize: 15 }
});
