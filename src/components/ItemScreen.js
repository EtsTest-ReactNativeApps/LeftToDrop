import React, { Component } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import ItemButton from './ItemButton';
import EmptyView from './EmptyView';
import SeparatorView from './SeparatorView';

import fetchItem from '../actions/fetch_item_action';
import fetchUser from '../actions/fetch_user_action';
import { toggleFavoriteItem } from '../actions/set_favorite_action';
import {
  toggleUpvoteItem,
  toggleDownvoteItem
} from '../actions/set_item_action';
import { defaultStyles, itemScreenStyles as styles } from '../styles';
import { capitalize } from '../utility';

class ItemScreen extends Component {
  itemID = this.props.navigation.state.params.id;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchItem, fetchUser } = this.props;
    fetchItem(this.itemID);
    fetchUser('krlargo'); /// Temp
  }

  // Clear Redux state on exit
  componentWillUnmount() {
    // Action Creators are defined to clear state when passed a null parameter
    this.props.fetchItem();
  }

  renderButtons() {
    const {
      item,
      favoriteItemIDs,
      upvotedItemIDs,
      downvotedItemIDs,
      toggleFavoriteItem,
      toggleUpvoteItem,
      toggleDownvoteItem
    } = this.props;

    const buttonData = [
      {
        objectArray: upvotedItemIDs,
        action: toggleUpvoteItem,
        label: 'Cop',
        color: 'red',
        marginRight: 2.5
      },
      {
        objectArray: favoriteItemIDs,
        action: toggleFavoriteItem,
        label: 'Favorite',
        color: 'black',
        marginLeft: 2.5,
        marginRight: 2.5
      },
      {
        objectArray: downvotedItemIDs,
        action: toggleDownvoteItem,
        label: 'Drop',
        color: 'blue',
        marginLeft: 2.5
      }
    ];

    return buttonData.map(
      ({ objectArray, action, label, color, marginLeft, marginRight }) => {
        const value = objectArray[this.itemID] || null;
        return (
          <ItemButton
            key={label}
            onPress={action.bind(item.id, 'krlargo', value)}
            label={value ? capitalize('Un' + label) : label}
            color={color}
            marginLeft={marginLeft}
            marginRight={marginRight}
          />
        );
      }
    );
  }

  render() {
    const {
      navigation,
      item,
      favoriteItemIDs,
      upvotedItemIDs,
      downvotedItemIDs,
      toggleFavoriteItem,
      toggleUpvoteItem,
      toggleDownvoteItem
    } = this.props;
    const { navigate } = navigation;

    console.log('FAVORITEITEMIDS: ' + JSON.stringify(favoriteItemIDs));
    console.log('UPVOTEDITEMIDS: ' + JSON.stringify(upvotedItemIDs));
    console.log('DOWNVOTEDITEMIDS: ' + JSON.stringify(downvotedItemIDs));

    if (
      item == null ||
      favoriteItemIDs == null ||
      upvotedItemIDs == null ||
      downvotedItemIDs == null
    ) {
      return <EmptyView message="Loading" />;
    } else {
      return (
        <View style={defaultStyles.containerView}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>

            <View style={styles.bottomContainerView}>
              <SeparatorView />
              <View style={styles.buttonContainerView}>
                {this.renderButtons.bind(this)()}
              </View>
              <SeparatorView />
              <View style={styles.descriptionView}>
                <Text style={[defaultStyles.text, styles.descriptionText]}>
                  {item.description || 'No description provided.'}
                </Text>
              </View>
              <SeparatorView />
            </View>
          </ScrollView>

          <View style={styles.itemNameContainerView}>
            <View style={styles.itemNameView}>
              <Text style={[defaultStyles.text, styles.itemNameText]}>
                {item.name}
              </Text>
            </View>
            <SeparatorView />
          </View>
        </View>
      );
    }
  }
}

mapStateToProps = ({
  item,
  user,
  favoriteItemIDs,
  upvotedItemIDs,
  downvotedItemIDs
}) => {
  return { item, user, favoriteItemIDs, upvotedItemIDs, downvotedItemIDs };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchItem,
      fetchUser,
      toggleFavoriteItem,
      toggleUpvoteItem,
      toggleDownvoteItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);
