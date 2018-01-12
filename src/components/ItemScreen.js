import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import { itemScreenStyle } from '../styles';

class ItemScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    var favoriteLabel = this.state.isFavorite ? 'Unfavorite' : 'Favorite';

    return (
      <View style={styles.container}>
        <Text style={styles.itemName}>{item.name}</Text>

        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>

        <View style={styles.caption}>
          <View style={styles.ratingContainer}>
            <TouchableOpacity
              style={styles.copButton}
              onPress={() => {
                Alert.alert('Upvoted');
              }}
            >
              <Text style={styles.buttonText}>Cop</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={this.setFavorite.bind(this, item._key)}
            >
              <Text style={styles.buttonText}>{favoriteLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropButton}
              onPress={() => {
                Alert.alert('Downvoted');
              }}
            >
              <Text style={styles.buttonText}>Drop</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chat} />
        </View>
      </View>
    );
  }
}

mapStateToProps = (_, ownProps) => {
  // SubComponents can either have loaded 'state' or passed static 'cellData'
  const state = ownProps.reduxState;
  const cellData = ownProps.staticCellData;
  if (state) {
    // If passed state, construct cellData here
    return {
      cellData: state.map(stateData => {
        const id = Object.keys(stateData)[0];
        const value = stateData[id];
        const screen = ownProps.screen;
        const label = value['name'];

        return { id, screen, label };
      })
    };
  } else if (cellData) {
    // Static data if no state is passed
    return { cellData };
  } else {
    // Temporary empty array when no cellData is available
    return {
      cellData: []
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ fetchAction: ownProps.fetchAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);
