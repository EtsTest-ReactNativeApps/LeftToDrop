import React, { Component } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

class ItemScreen extends Comonent {
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontFamily: 'Futura',
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center'
  },
  caption: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 15,
    marginTop: 0
  },
  chat: {
    backgroundColor: 'lightgray',
    borderRadius: 3,
    flex: 1,
    marginTop: 5
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  copButton: {
    backgroundColor: 'red',
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    marginRight: 2.5
  },
  dropButton: {
    backgroundColor: 'black',
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 2.5
  },
  favoriteButton: {
    backgroundColor: 'blue',
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 2.5,
    marginRight: 2.5
  },
  image: {
    height: '100%',
    resizeMode: 'contain'
  },
  imageView: {
    backgroundColor: 'white',
    borderRadius: 3,
    flex: 2,
    justifyContent: 'center',
    padding: 10,
    margin: 15,
    marginBottom: 5,
    overflow: 'hidden'
  },
  itemName: {
    color: 'black',
    fontFamily: 'Courier New',
    fontSize: 15,
    margin: 15,
    marginBottom: 0,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 35
  }
});
