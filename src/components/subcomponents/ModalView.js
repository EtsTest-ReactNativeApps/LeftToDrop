import React, { Component } from 'react';
import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import ItemButton from '../subcomponents/ItemButton';
import ErrorMessage from '../subcomponents/ErrorMessage';
import {
  defaults,
  defaultStyles,
  modalViewStyles as styles,
  loginViewStyles
} from '../../styles';

class ModalView extends Component {
  constructor(props) {
    super(props);
    this.state = { value: undefined, errorMessage: null };
  }

  // ModalView is setup before it appears; componentWillReceiveProps() will act as constructor()
  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.contents.value });
  }

  presentErrorMessage(errorMessage) {
    if (errorMessage) {
      return (
        <Text style={[defaultStyles.text, loginViewStyles.errorText]}>
          {errorMessage}
        </Text>
      );
    }
  }

  render() {
    const { closeModal, contents, visibility } = this.props;
    const {
      description,
      submitAction,
      cancelLabel,
      submitLabel,
      secureTextEntry
    } = contents;
    const { value, errorMessage } = this.state;

    return (
      <Modal
        animationType={'fade'}
        onRequestClose={closeModal}
        transparent={true}
        visible={visibility}
      >
        <TouchableHighlight
          style={styles.modalContainerView}
          onPress={closeModal}
        >
          <TouchableHighlight style={styles.modalView} onPress={null}>
            <View style={styles.content}>
              <View
                style={[
                  defaultStyles.formRow,
                  (() => {
                    // Double description height if there are no textFields
                    if (value === null) {
                      return { height: defaults.cellContentHeight * 2 };
                    }
                  })()
                ]}
              >
                <Text style={[defaultStyles.text, { textAlign: 'center' }]}>
                  {description}
                </Text>
              </View>
              {(() => {
                if (value !== null) {
                  // Show TextInput for undefined values
                  return (
                    <View style={defaultStyles.formRow}>
                      <TextInput
                        style={[defaultStyles.text, defaultStyles.textInput]}
                        value={value}
                        onChangeText={value => this.setState({ value })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus
                        secureTextEntry={secureTextEntry}
                      />
                    </View>
                  );
                }
              })()}
              {(() => {
                if (errorMessage) {
                  return (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        height: 20,
                        width: '100%'
                      }}
                    >
                      <ErrorMessage
                        errorMessage={'Failed to update username.'}
                      />
                    </View>
                  );
                }
              })()}

              <View style={defaultStyles.formRow}>
                {(() => {
                  if (cancelLabel) {
                    return (
                      <ItemButton
                        onPress={closeModal}
                        label={cancelLabel}
                        color={'black'}
                        marginLeft={0}
                        marginRight={5}
                      />
                    );
                  }
                })()}
                <ItemButton
                  onPress={() => {
                    submitAction(value);
                    closeModal();
                  }}
                  label={submitLabel}
                  color={'red'}
                  marginLeft={cancelLabel ? 5 : 0}
                  marginRight={0}
                />
              </View>
            </View>
          </TouchableHighlight>
        </TouchableHighlight>
      </Modal>
    );
  }
}

export default ModalView;
