import React, { Component } from 'react';
import { Animated, Keyboard, Text, TextInput, View } from 'react-native';
import ItemButton from '../subcomponents/ItemButton.js';
import ErrorMessage from '../subcomponents/ErrorMessage';
import { defaultStyles, loginViewStyles as styles } from '../../styles';

const login = props => {
  const { firebaseLogin, state } = props;
  const { email, password } = state;
  firebaseLogin(email, password, error => loginCallback(props, error));
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
  const { state, setState, dissolveAnimate } = props;
  const { username, email, password, fadeAnim, loginError } = state;

  return (
    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
      <View style={styles.inputDescription}>
        <Text style={defaultStyles.text}>{/*Username or */}Email</Text>
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
      <ErrorMessage errorMessage={loginError} />
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
