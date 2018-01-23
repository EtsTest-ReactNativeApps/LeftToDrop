import React, { Component } from 'react';
import { Animated, Keyboard, Text, TextInput, View } from 'react-native';
import ItemButton from '../subcomponents/ItemButton.js';
import { isAlphaNumeric, isValidEmail } from '../../utility';
import { defaultStyles, loginViewStyles as styles } from '../../styles';

const signup = props => {
  if (validateSignup.bind(this)(props)) {
    console.log('VALIDLOGIN: ' + JSON.stringify(props));
  } else {
    Keyboard.dismiss();
  }
};

const validateSignup = props => {
  const { state, setState } = props;
  const { username, email, password, verifyPassword } = state;

  let signupUsernameError = null;
  let signupEmailError = null;
  let signupPasswordError = null;
  let signupVerifyPasswordError = null;

  // Validate username
  if (username.length < 3) {
    signupUsernameError = 'Username must be at least 3 characters.';
  } else if (isAlphaNumeric(username)) {
    signupUsernameError: 'Username must be alphanumeric.';
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

  setState({
    signupUsernameError,
    signupEmailError,
    signupPasswordError,
    signupVerifyPasswordError
  });

  // Return true if all errors are null
  return !(
    signupUsernameError ||
    signupEmailError ||
    signupPasswordError ||
    signupVerifyPasswordError
  );
};

const SignupView = props => {
  const { state, setState } = props;
  const { username, email, password, verifyPassword, fadeAnim } = state;

  const {
    signupUsernameError,
    signupEmailError,
    signupPasswordError,
    signupVerifyPasswordError
  } = state;

  const { presentErrorMessage, dissolveAnimate } = props;

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
              setState({
                username,
                signupUsernameError: null
              });
            } else {
              setState({
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
      {presentErrorMessage(signupUsernameError)}
      <View style={styles.inputDescription}>
        <Text style={defaultStyles.text}>Email</Text>
      </View>
      <View style={defaultStyles.formRow}>
        <TextInput
          // Values
          style={[defaultStyles.text, defaultStyles.textInput]}
          value={email}
          ref={signupEmailRef => (this.signupEmailRef = signupEmailRef)}
          onChangeText={email => setState({ email, signupEmailError: null })}
          onSubmitEditing={() => this.signupPasswordRef.focus()}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={40}
          secureTextEntry={false}
        />
      </View>
      {presentErrorMessage(signupEmailError)}
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
            setState({ password, signupPasswordError: null })
          }
          onSubmitEditing={() => this.signupVerifyPasswordRef.focus()}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      {presentErrorMessage(signupPasswordError)}
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
            setState({ verifyPassword, signupVerifyPasswordError: null })
          }
          onSubmitEditing={signup.bind(this, props)}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      {presentErrorMessage(signupVerifyPasswordError)}
      <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
        <ItemButton
          onPress={signup.bind(this, props)}
          label={'Signup'}
          color={'red'}
        />
      </View>
      <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
        <ItemButton
          onPress={dissolveAnimate.bind(this)}
          label={'Login'}
          color={'black'}
        />
      </View>
    </Animated.View>
  );
};

export default SignupView;
