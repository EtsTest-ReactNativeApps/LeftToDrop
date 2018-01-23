import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ModalView from '../subcomponents/ModalView';
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
  constructor(props) {
    super(props);
    this.state = {
      modalContents: {
        description: 'DESCRIPTION',
        value: 'VALUE',
        submitLabel: 'LABEL'
      },
      modalVisibility: false
    };
  }

  presentModalAlert(
    description,
    value,
    cancelLabel = 'Cancel',
    submitLabel = 'Save'
  ) {
    const modalContents = {
      description,
      value,
      cancelLabel,
      submitLabel
    };
    this.setState({
      modalContents,
      modalVisibility: true
    });
  }

  aboutPopup() {
    console.log('PRESENTABOUTPOPOUP');
  }

  closeModal() {
    this.setState({
      modalVisibility: false
    });
  }

  render() {
    const { modalContents, modalVisibility } = this.state;

    return (
      <ScrollView style={defaultStyles.containerView}>
        <ModalView
          closeModal={() => this.closeModal.bind(this)()}
          contents={modalContents}
          visibility={modalVisibility}
        />

        <StaticRow
          label="Username"
          value={this.props.user.username}
          onPressRow={() =>
            this.presentModalAlert(
              'Edit your username.',
              this.props.user.username
            )
          }
        />
        <StaticRow
          label="Email"
          value={this.props.user.email}
          onPressRow={() =>
            this.presentModalAlert(
              'Edit your email address.',
              this.props.user.email
            )
          }
        />
        <StaticRow
          label="Password"
          value="*******"
          onPressRow={() =>
            this.presentModalAlert('Edit your password', '*******')
          }
        />
        <SpacerView />
        <StaticRow
          label="Contact"
          onPressRow={() =>
            this.presentModalAlert(
              "If you've got any questions or have any suggestions, please send an email to kevinlargoapps@gmail.com",
              null,
              null,
              'Dismiss'
            )
          }
        />
        <SpacerView />
        <StaticRow
          label="Delete Account"
          onPressRow={() => this.deleteAccountPopup()}
          labelStyle={styles.textDelete}
          onPressRow={() =>
            this.presentModalAlert(
              "Are you sure you'd like to permanently delete your account?",
              null,
              undefined,
              'Delete'
            )
          }
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
