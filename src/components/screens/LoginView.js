import React, { Component } from 'react';
import { Animated, Keyboard, Text, TextInput, View } from 'react-native';
import ItemButton from '../subcomponents/ItemButton.js';
import { defaultStyles, loginViewStyles as styles } from '../../styles';

const login = props => {
  const { firebaseLogin, state } = props;
  const { email, password } = state;

  if (validateLogin(props)) {
    firebaseLogin(email, password, error => loginCallback(props, error));
  }
};

const validateLogin = props => {
  const { state, setState } = props;
  const { email, password } = state;

  let loginEmailError = null;
  let loginPasswordError = null;

  // Validate username
  if (email.length == 0) loginEmailError = 'Email cannot be empty.';

  setState({
    loginEmailError,
    loginPasswordError
  });

  return !(loginEmailError || loginPasswordError);
};

const loginCallback = (props, loginError) => {
  const { setState, navigation } = props;
  setState({ loginError });

  Keyboard.dismiss();
  if (!loginError) {
    navigation.goBack();
  }
};

const LoginView = props => {
  const { state, setState, presentErrorMessage, dissolveAnimate } = props;
  const {
    username,
    email,
    password,
    fadeAnim,
    loginError,
    loginEmailError
  } = state;

  return (
    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
      <View style={styles.inputDescription}>
        <Text style={defaultStyles.text}>Username or Email</Text>
      </View>
      <View style={defaultStyles.formRow}>
        <TextInput
          // Values
          style={[defaultStyles.text, defaultStyles.textInput]}
          value={/*username || */ email} // Check username first, then email if username is null
          onChangeText={text => {
            setState({ email: text });

            /*// Either email or username must be null since login uses one or the other
            if (text.includes('@')) {
              var key = 'email';
              var otherKey = 'username';
            } else {
              var key = 'username';
              var otherKey = 'email';
            }
            setState({ [key]: text, [otherKey]: null });*/
          }}
          onSubmitEditing={() => this.loginPasswordRef.focus()}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          secureTextEntry={false}
        />
      </View>
      {presentErrorMessage(loginEmailError)}
      <View style={styles.inputDescription}>
        <Text style={defaultStyles.text}>Password</Text>
      </View>
      <View style={defaultStyles.formRow}>
        <TextInput
          // Values
          style={[defaultStyles.text, defaultStyles.textInput]}
          value={password}
          ref={loginPasswordRef => (this.loginPasswordRef = loginPasswordRef)}
          onSubmitEditing={login.bind(this, props)}
          onChangeText={password => setState({ password })}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      {presentErrorMessage(loginError)}
      <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
        <ItemButton
          onPress={login.bind(this, props)}
          label={'Login'}
          color={'red'}
        />
      </View>
      <View style={[defaultStyles.formRow, { marginTop: 10 }]}>
        <ItemButton
          onPress={dissolveAnimate.bind(this)}
          label={'Signup'}
          color={'black'}
        />
      </View>
    </Animated.View>
  );
};

export default LoginView;
