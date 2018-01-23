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
import LoginView from './LoginView';
import SignupView from './SignupView';
import ItemButton from '../subcomponents/ItemButton.js';
import { isAlphaNumeric, isValidEmail } from '../../utility';
import { defaultStyles, loginViewStyles as styles } from '../../styles';

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
    this.setState({ keyboardHeight: 0 });
  }

  presentErrorMessage(errorMessage) {
    if (errorMessage) {
      return (
        <Text style={[defaultStyles.text, styles.errorText]}>
          {errorMessage}
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
              return (
                <LoginView
                  state={this.state}
                  setState={this.setState.bind(this)}
                  presentErrorMessage={this.presentErrorMessage}
                  dissolveAnimate={this.dissolveAnimate.bind(this)}
                />
              );
            } else {
              return (
                <SignupView
                  state={this.state}
                  setState={this.setState.bind(this)}
                  presentErrorMessage={this.presentErrorMessage}
                  dissolveAnimate={this.dissolveAnimate.bind(this)}
                />
              );
            }
          })()}
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;
