import React, { Component } from 'react';
import { Animated, Keyboard, Text, TextInput, View } from 'react-native';
import ItemButton from '../subcomponents/ItemButton.js';
import { defaultStyles, loginViewStyles as styles } from '../../styles';

const login = props => {
  if (validateLogin.bind(this)()) {
    console.log('VALDISIGNUP: ' + JSON.stringify(props));
  } else {
    Keyboard.dismiss();
  }
};

const validateLogin = props => {
  return true;
  //  const { username, password } = this.state;
  let loginError = null;

  if (false) {
    loginError = 'Invalid credentials.';
  }
};

const LoginView = props => {
  const { state, setState } = props;
  const { username, email, password, fadeAnim } = state;
  const { presentErrorMessage, dissolveAnimate } = props;

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
            // Either email or username must be null since login uses either
            if (text.includes('@')) {
              var key = 'email';
              var otherKey = 'username';
            } else {
              var key = 'username';
              var otherKey = 'email';
            }
            setState({ [key]: text, [otherKey]: null });
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
          onSubmitEditing={login.bind(this, props)}
          onChangeText={password => setState({ password })}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
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
