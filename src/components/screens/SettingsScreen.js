import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { defaultStyles, listViewStyles as styles } from '../../styles';

class StaticRow extends Component {
  render() {
    const { label, value, onPressRow, labelStyle } = this.props;
    return (
      <TouchableHighlight underlayColor="whitesmoke" onPress={onPressRow}>
        <View style={styles.cell}>
          <Text style={[defaultStyles.text, labelStyle]}>{label}</Text>
          <Text style={[defaultStyles.text, styles.textDetail]}>{value}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const SpacerView = () => {
  return <View style={styles.spacer} />;
};

class SettingsScreen extends Component {
  changeUsernamePopup() {
    console.log('Present change username popup');
  }

  changeEmailPopup() {
    console.log('Present change email popup');
  }

  changePasswordPopup() {
    console.log('Present change password popup');
  }

  aboutPopup() {
    console.log('Present About popup');
  }

  deleteAccountPopup() {
    console.log('Present delete account popup');
  }

  render() {
    return (
      <ScrollView style={defaultStyles.containerView}>
        <StaticRow
          label="Username"
          value={this.props.user.username}
          onPressRow={this.changeUsernamePopup}
        />
        <StaticRow
          label="Email"
          value={this.props.user.email}
          onPressRow={this.changeUsernamePopup}
        />
        <StaticRow
          label="Password"
          value="*******"
          onPressRow={this.changePasswordPopup}
        />
        <SpacerView />
        <StaticRow label="About" onPressRow={this.navigateToAbout} />
        <SpacerView />
        <StaticRow
          label="Delete Account"
          onPressRow={this.deleteAccountPopup}
          labelStyle={styles.textDelete}
        />
      </ScrollView>
    );
  }
}

mapStateToProps = ({ user }) => {
  return { user };
};

mapDispatchToProps => dispatch => {
  return bindActionCreators(
    { setUsername, setPassword, setEmail, deleteAccount },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
