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
import ItemButton from '../subcomponents/ItemButton';
import { capitalize } from '../../utility';
import { firebaseLogin, firebaseSignup } from '../../actions';
import { defaultStyles, loginViewStyles as styles } from '../../styles';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const title = params ? params.title : 'Login';
    return { title };
  };

  constructor(props) {
    super(props);

    this.state = {
      username: 'xkevlar',
      email: 'xkevlar@live.com',
      password: 'abc12345',
      verifyPassword: 'abc12345',
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

  dissolveAnimate() {
    const { fadeAnim, view } = this.state;
    const newView = view == 'login' ? 'signup' : 'login';

    // Update navBar title
    const title = capitalize(newView);
    this.props.navigation.setParams({ title });

    /*Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10000
    }).start(() => {*/
    this.setState({
      //fadeAnim: new Animated.Value(0),
      view: newView
    });
    /*});*/
  }

  render() {
    const { fadeAnim, keyboardHeight, view } = this.state;

    /*Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();*/

    return (
      <View style={defaultStyles.containerView}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ marginBottom: keyboardHeight }}
          scrollEnabled={keyboardHeight ? true : false}
          keyboardShouldPersistTaps="always"
        >
          {(() => {
            if (view == 'login') {
              return (
                <LoginView
                  state={this.state}
                  setState={this.setState.bind(this)}
                  navigation={this.props.navigation}
                  firebaseLogin={this.props.firebaseLogin}
                  dissolveAnimate={this.dissolveAnimate.bind(this)}
                />
              );
            } else {
              return (
                <SignupView
                  state={this.state}
                  setState={this.setState.bind(this)}
                  navigation={this.props.navigation}
                  firebaseSignup={this.props.firebaseSignup}
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ firebaseLogin, firebaseSignup }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginScreen);
