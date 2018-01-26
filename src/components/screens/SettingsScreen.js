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
import ErrorMessage from '../subcomponents/ErrorMessage';
import {
  setUsername,
  setEmail,
  setPassword,
  deleteAccount
} from '../../actions';
import {
  usernameExists,
  validateUsername,
  validatePassword
} from '../../validation';
import {
  defaults,
  defaultStyles,
  listViewStyles as styles
} from '../../styles';

class StaticRow extends Component {
  render() {
    // null means NO VALUE, undefined means no value SET YET
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
      // Needs default modalContents for invisible ModalView
      modalContents: {
        description: null,
        value: null,
        submitAction: null,
        cancelLabel: null,
        submitLabel: null,
        secureTextEntry: null
      },
      modalVisibility: false,
      editUserError: null,
      deleteUserError: null
    };
  }

  presentModalAlert(
    description,
    value,
    submitAction = null,
    cancelLabel = 'Cancel',
    submitLabel = 'Save',
    secureTextEntry = false
  ) {
    const modalContents = {
      description,
      value,
      submitAction,
      cancelLabel,
      submitLabel,
      secureTextEntry
    };
    this.setState({
      modalContents,
      modalVisibility: true
    });
  }

  setErrorMessage(errorType, errorMessage) {
    // Remove other error; only one error message should be visible at a time
    const otherErrorType =
      errorType == 'editUserError' ? 'deleteUserError' : 'editUserError';
    this.setState({
      [errorType]: errorMessage,
      [otherErrorType]: null
    });
  }

  closeModal() {
    this.setState({
      modalVisibility: false
    });
  }

  validateAndSubmitUsername(newUsername) {
    const { setUsername, user } = this.props;
    const oldUsername = user.username;

    // If no username change, then erase error
    if (newUsername === oldUsername)
      return this.setErrorMessage('editUserError', null);

    // If error found during validation, return from here
    let editUsernameError = validateUsername(newUsername);

    if (editUsernameError) {
      return this.setErrorMessage('editUserError', editUsernameError);
    } else {
      // Else, continue with checking if username already exists;
      let usernameExistsPromise = usernameExists(newUsername);
      Promise.all([usernameExistsPromise]).then(results => {
        const usernameExists = results[0].val();
        editUsernameError = usernameExists
          ? 'Username is already in use.'
          : editUsernameError;

        if (!editUsernameError) {
          // If no errors, set username
          setUsername(newUsername, oldUsername, editUsernameError => {
            this.setErrorMessage('editUserError', editUsernameError);
          });
        } else {
          this.setErrorMessage('editUserError', editUsernameError);
        }
      });
    }
  }

  validateAndSubmitPassword(newPassword) {
    let editPasswordError = validatePassword(newPassword);
    if (!editPasswordError) {
      // If no errors, set password
      setPassword(newPassword, editPasswordError => {
        this.setErrorMessage('editUserError', editPasswordError);
      });
    } else {
      this.setErrorMessage('editUserError', editPasswordError);
    }
  }

  render() {
    const {
      modalContents,
      modalVisibility,
      editUserError,
      deleteUserError
    } = this.state;
    const {
      user,
      setUsername,
      setEmail,
      setPassword,
      deleteAccount,
      navigation
    } = this.props;

    //const username = user ? user.username : null;
    //const email = user ? user.auth.email : null;
    //const opacity = user ? 1 : 0.6;

    let username = null;
    let email = null;
    let opacity = 0.6;

    // If logged-in user
    if (user && !user.auth.isAnonymous) {
      username = user.username;
      email = user.auth.email;
      opacity = 1;
    }

    return (
      <ScrollView
        style={defaultStyles.containerView}
        keyboardShouldPersistTaps="always"
      >
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
            if (user && !user.auth.isAnonymous)
              this.presentModalAlert(
                'Edit your username.',
                username,
                newUsername => this.validateAndSubmitUsername(newUsername)
              );
          }}
        />
        <StaticRow
          label="Email"
          labelStyle={{ opacity }}
          value={email}
          onPressRow={() => {
            if (user && !user.auth.isAnonymous)
              this.presentModalAlert(
                'Edit your email address.',
                email,
                newEmail =>
                  setEmail(newEmail, errorMessage => {
                    this.setErrorMessage('editUserError', errorMessage);
                  })
              );
          }}
        />
        <StaticRow
          label="Password"
          labelStyle={{ opacity }}
          value={user && !user.auth.isAnonymous ? '*******' : null}
          onPressRow={() => {
            if (user && !user.auth.isAnonymous)
              this.presentModalAlert(
                'Edit your password',
                '*******',
                newPassword => this.validateAndSubmitPassword(newPassword),
                undefined, // default cancelLabel
                undefined, // default submitLabel
                true
              );
          }}
        />
        <View
          style={{ marginHorizontal: defaults.marginHorizontal, marginTop: 5 }}
        >
          <ErrorMessage errorMessage={editUserError} />
        </View>
        <SpacerView />
        <StaticRow
          label="Contact"
          onPressRow={() =>
            this.presentModalAlert(
              "If you've got any questions or have any suggestions, please send an email to kevinlargoapps@gmail.com",
              null, // no value
              this.closeModal.bind(this), // no submitAction
              null, // no cancelLabel
              'Dismiss' // submitLabel
            )
          }
        />
        <SpacerView />
        <StaticRow
          label="Delete Account"
          labelStyle={[styles.textDelete, { opacity }]}
          onPressRow={() => {
            if (user && !user.auth.isAnonymous)
              this.presentModalAlert(
                "Are you sure you'd like to permanently delete your account?",
                null, // value
                () =>
                  deleteAccount(errorMessage => {
                    this.setErrorMessage('deleteUserError', errorMessage);
                    if (!errorMessage) navigation.goBack();
                  }),
                undefined, // default cancelLabel
                'Delete' // submitLabel
              );
          }}
        />
        <View
          style={{ marginHorizontal: defaults.marginHorizontal, marginTop: 5 }}
        >
          <ErrorMessage errorMessage={deleteUserError} />
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = ({ user }) => {
  return { user };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setUsername,
      setEmail,
      setPassword,
      deleteAccount
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
