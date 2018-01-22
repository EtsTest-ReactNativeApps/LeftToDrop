import React, { Component } from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalView } from '../subcomponents/ModalView';
import {
  defaultStyles,
  listViewStyles as styles,
  modalViewStyles
} from '../../styles';

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
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      text: ''
    };
  }

  changeUsernamePopup() {
    this.setState({
      modalVisible: true,
      text: 'CHANGEUSERNAMEPOPUP'
    });
  }

  changeEmailPopup() {
    this.setState({
      modalVisible: true,
      text: 'CHANGEEMAILPOPUP'
    });
  }

  changePasswordPopup() {
    this.setState({
      modalVisible: true,
      text: 'CHANGEPASSWORDPOPUP'
    });
  }

  aboutPopup() {
    this.setState({
      modalVisible: true,
      text: 'ABOUTPOPUP'
    });
  }

  deleteAccountPopup() {
    this.setState({
      modalVisible: true,
      text: 'DELETEACCOUNTPOPUP'
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    return (
      <ScrollView style={defaultStyles.containerView}>
        <Modal
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View
            style={modalViewStyles.modalContainerView}
            onPress={() => this.closeModal()}
          >
            <View style={{ flex: 1, flexDirection: 'column' }} />
            <View style={modalViewStyles.modalView}>
              <Text>{this.state.text}</Text>
              <Button onPress={() => this.closeModal()} title="Close modal" />
            </View>
            <View style={{ flex: 2, flexDirection: 'column' }} />
          </View>
        </Modal>

        <StaticRow
          label="Username"
          value={this.props.user.username || ''}
          onPressRow={() => this.changeUsernamePopup()}
        />
        <StaticRow
          label="Email"
          value={this.props.user.email || ''}
          onPressRow={() => this.changeUsernamePopup()}
        />
        <StaticRow
          label="Password"
          value="*******"
          onPressRow={() => this.changePasswordPopup()}
        />
        <SpacerView />
        <StaticRow label="About" onPressRow={() => this.navigateToAbout()} />
        <SpacerView />
        <StaticRow
          label="Delete Account"
          onPressRow={() => this.deleteAccountPopup()}
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
