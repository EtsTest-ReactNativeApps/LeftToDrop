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
import {
  defaults,
  defaultStyles,
  modalViewStyles as styles
} from '../../styles';

class ModalView extends Component {
  render() {
    const { closeModal, contents, visibility } = this.props;
    const { description, value, cancelLabel, submitLabel } = contents;

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
                    // Double desription height if there are no textFields
                    if (!value) {
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
                if (value) {
                  return (
                    <View style={defaultStyles.formRow}>
                      <TextInput
                        style={[defaultStyles.text, defaultStyles.textInput]}
                        value={value}
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
                  onPress={closeModal}
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
