import React, { Component } from 'react';
import { Animated, Keyboard, Text, TextInput, View } from 'react-native';
import ItemButton from '../subcomponents/ItemButton';
import ErrorMessage from '../subcomponents/ErrorMessage';
import { validateUsername, validatePasswords } from '../../validation';
import { usernameExists } from '../../firebase';
import { isAlphaNumeric } from '../../utility';
import { defaultStyles, loginViewStyles as styles } from '../../styles';

const signup = props => {
  const { firebaseSignup, state } = props;
  const { email, username, password, verifyPassword } = state;

  Keyboard.dismiss();
  if (validateSignup(props)) {
    firebaseSignup(email, username, password, error =>
      signupCallback(props, error)
    );
  }
};

export const validateSignup = props => {
  const { state, setState } = props;
  const { username, password, verifyPassword } = state;

  let signupUsernameError = validateUsername(username);
  let signupPasswordError = validatePasswords(password, verifyPassword);
  let usernameExistsPromise = usernameExists(username);

  // Wait for promises to resolve before setting state
  Promise.all([usernameExistsPromise])
    .then(results => {
      const usernameExists = results[0].val();
      signupUsernameError = usernameExists
        ? 'Username is already in use.'
        : signupUsernameError;

      setState({
        signupUsernameError,
        signupPasswordError
      });

      // Return true if all errors are null
      return !(signupUsernameError || signupPasswordError);
    })
    .catch(() => {
      setState({
        signupUsernameError: 'Could not verify that username is not in use.',
        signupPasswordError
      });
    });
};

const signupCallback = (props, signupError) => {
  const { setState, navigation } = props;
  setState({ signupError });
  console.log('SIGNUPERROR: ' + signupError);
  if (!signupError) {
    navigation.goBack();
  } else {
    Keyboard.dismiss();
  }
};

const SignupView = props => {
  const { state, setState } = props;
  const { username, email, password, verifyPassword, fadeAnim } = state;

  const { signupUsernameError, signupPasswordError, signupError } = state;

  const { dissolveAnimate } = props;

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
          onChangeText={username => setState({ username })}
          onSubmitEditing={() => this.signupEmailRef.focus()}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          maxLength={20}
          secureTextEntry={false}
        />
      </View>
      <ErrorMessage errorMessage={signupUsernameError} />
      <View style={styles.inputDescription}>
        <Text style={defaultStyles.text}>Email</Text>
      </View>
      <View style={defaultStyles.formRow}>
        <TextInput
          // Values
          style={[defaultStyles.text, defaultStyles.textInput]}
          value={email}
          ref={signupEmailRef => (this.signupEmailRef = signupEmailRef)}
          onChangeText={email => setState({ email })}
          onSubmitEditing={() => this.signupPasswordRef.focus()}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={40}
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
      <ErrorMessage errorMessage={signupPasswordError} />
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
          onChangeText={verifyPassword => setState({ verifyPassword })}
          onSubmitEditing={signup.bind(this, props)}
          // Configuration
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      <ErrorMessage errorMessage={signupError} />
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
