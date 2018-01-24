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
    const { user } = this.props;
    const username = user ? user.username : null;
    const email = user ? user.email : null;
    const opacity = user ? 1 : 0.6;

    return (
      <ScrollView style={defaultStyles.containerView}>
        <ModalView
          closeModal={() => this.closeModal.bind(this)()}
          contents={modalContents}
          visibility={modalVisibility}
        />

        <StaticRow
          label="Username"
          labelStyle={{ opacity }}
          value={username}
          onPressRow={() => {
            if (user) this.presentModalAlert('Edit your username.', username);
          }}
        />
        <StaticRow
          label="Email"
          labelStyle={{ opacity }}
          value={email}
          onPressRow={() => {
            if (user) this.presentModalAlert('Edit your email address.', email);
          }}
        />
        <StaticRow
          label="Password"
          labelStyle={{ opacity }}
          value={user ? '*******' : null}
          onPressRow={() => {
            if (user) this.presentModalAlert('Edit your password', '*******');
          }}
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
          labelStyle={[styles.textDelete, { opacity }]}
          onPressRow={() => {
            if (user)
              this.presentModalAlert(
                "Are you sure you'd like to permanently delete your account?",
                null,
                undefined,
                'Delete'
              );
          }}
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
