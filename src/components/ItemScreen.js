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

import ItemButton from './ItemButton';
import LoadingView from './LoadingView';
import { favoriteItem, unfavoriteItem } from '../actions/item_action';
import fetchItem from '../actions/fetch_item_action';
import fetchUser from '../actions/fetch_user_action';
import { itemScreenStyle as styles } from '../styles';

class ItemScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const itemID = this.props.navigation.state.params.id;
    const { fetchItem, fetchUser } = this.props;
    fetchItem(itemID);
    fetchUser('krlargo'); /// Temp
  }

  // Clear Redux state on exit
  componentWillUnmount() {
    // Action Creators are defined to clear state when passed a null parameter
    this.props.fetchItem();
  }

  isFavorite() {
    const itemID = this.props.navigation.state.params.id;
    return this.props.favoriteItemIDs[itemID] === true;
  }

  toggleFavorite() {
    const itemID = this.props.navigation.state.params.id;
    const { unfavoriteItem, favoriteItem } = this.props;

    if (this.isFavorite()) {
      this.props.unfavoriteItem(itemID, 'krlargo');
    } else {
      this.props.favoriteItem(itemID, 'krlargo');
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    const item = this.props.item;

    if (item) {
      var favoriteLabel = this.isFavorite() ? 'Unfavorite' : 'Favorite';
      return (
        <View style={styles.container}>
          <Text style={styles.itemName}>{item.name}</Text>

          <View style={styles.imageView}>
            <Image style={styles.image} source={{ uri: item.image }} />
          </View>

          <View style={styles.caption}>
            <View style={styles.ratingContainer}>
              <ItemButton
                label="Cop"
                onPress={() => console.log('COP')}
                color="red"
                marginRight={2.5}
              />

              <ItemButton
                label={favoriteLabel}
                onPress={this.toggleFavorite.bind(this)}
                color="black"
                marginLeft={2.5}
                marginRight={2.5}
              />

              <ItemButton
                label="Drop"
                onPress={() => console.log('DROP')}
                color="blue"
                marginLeft={2.5}
              />
            </View>

            <View style={styles.chat} />
          </View>
        </View>
      );
    } else {
      return <LoadingView />;
    }
  }
}

mapStateToProps = ({ favoriteItemIDs, item, user }) => {
  return { favoriteItemIDs, item, user };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchItem,
      fetchUser,
      favoriteItem,
      unfavoriteItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);
