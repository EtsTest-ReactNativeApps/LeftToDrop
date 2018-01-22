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
import { defaultStyles, modalViewStyles as styles } from '../../styles';

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
          <View>
            <View style={{ flex: 1 }} />
            <TouchableHighlight style={styles.modalView} onPress={null}>
              <View style={styles.content}>
                <View style={[styles.description, { flex: value ? 1 : 2 }]}>
                  <Text style={[defaultStyles.text, { textAlign: 'center' }]}>
                    {description}
                  </Text>
                </View>
                {(() => {
                  if (value) {
                    return (
                      <View style={styles.textField /* TextInput row */}>
                        <TextInput
                          style={[defaultStyles.text, styles.textInput]}
                          value={value}
                        />
                      </View>
                    );
                  }
                })()}
                <View style={styles.buttonRow /* Button row */}>
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
            <View style={{ flex: 2 }} />
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

export default ModalView;
