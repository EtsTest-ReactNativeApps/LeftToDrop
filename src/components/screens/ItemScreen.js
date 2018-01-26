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

import ItemButton from '../subcomponents/ItemButton';
import EmptyView from '../subcomponents/EmptyView';
import RatingBarView from '../subcomponents/RatingBarView';
import SeparatorView from '../subcomponents/SeparatorView';

import {
  fetchItem,
  toggleFavoriteItem,
  toggleUpvoteItem,
  toggleDownvoteItem
} from '../../actions';

import { defaultStyles, itemScreenStyles as styles } from '../../styles';

class ItemScreen extends Component {
  itemID = this.props.navigation.state.params.id;

  componentDidMount() {
    const { fetchItem } = this.props;
    fetchItem(this.itemID);
  }

  // Clear Redux state on exit
  componentWillUnmount() {
    // Action Creators are defined to clear state when passed a null parameter
    this.props.fetchItem();
  }

  upvoteItem(itemID, userID, value) {
    const {
      userVoteItemIDs,
      toggleUpvoteItem,
      toggleDownvoteItem
    } = this.props;
    const downvotedItemIDs = userVoteItemIDs.downvotedItemIDs;

    toggleUpvoteItem(itemID, userID, value);
    // If previously downvoted, remove downvote
    if (downvotedItemIDs[itemID]) {
      toggleDownvoteItem(itemID, userID, null);
    }
  }

  downvoteItem(itemID, userID, value) {
    const {
      userVoteItemIDs,
      toggleUpvoteItem,
      toggleDownvoteItem
    } = this.props;
    const upvotedItemIDs = userVoteItemIDs.upvotedItemIDs;

    toggleDownvoteItem(itemID, userID, value);
    // If previously upvoted, remove upvote
    if (upvotedItemIDs[itemID]) {
      toggleUpvoteItem(itemID, userID, null);
    }
  }

  renderButtons() {
    const { favoriteItemIDs, userVoteItemIDs, toggleFavoriteItem } = this.props;

    const upvotedItemIDs = userVoteItemIDs.upvotedItemIDs;
    const downvotedItemIDs = userVoteItemIDs.downvotedItemIDs;

    console.log('UPVOTEDITEMIDS: ' + [upvotedItemIDs]);
    console.log('DOWNVOTEITEMIDS: ' + downvotedItemIDs);
    console.log('ITEMID: ' + this.itemID);

    const buttonData = [
      {
        objectArray: upvotedItemIDs,
        action: this.upvoteItem,
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
        action: this.downvoteItem,
        label: 'Drop',
        color: 'blue',
        marginLeft: 2.5
      }
    ];

    return buttonData.map(
      ({ objectArray, action, label, color, marginLeft, marginRight }) => {
        const value = objectArray[this.itemID] ? null : true;
        return (
          <ItemButton
            key={label}
            onPress={action.bind(this, this.itemID, this.props.user.id, value)}
            label={value ? label : 'Un' + label.toLowerCase()}
            color={color}
            marginLeft={marginLeft}
            marginRight={marginRight}
          />
        );
      }
    );
  }

  render() {
    const { item, favoriteItemIDs, userVoteItemIDs } = this.props;

    const upvotedItemIDs = userVoteItemIDs.upvotedItemIDs;
    const downvotedItemIDs = userVoteItemIDs.downvotedItemIDs;

    console.log('ITEM: ' + item);
    console.log('FAVITEMIDS: ' + favoriteItemIDs);
    console.log('UPVOTEDIDS: ' + upvotedItemIDs);
    console.log('DOWNVOTEIDS: ' + downvotedItemIDs);

    if (
      item == null ||
      favoriteItemIDs == null ||
      upvotedItemIDs == null ||
      downvotedItemIDs == null
    ) {
      return <EmptyView message="Loading..." />;
    } else {
      return (
        <View style={defaultStyles.containerView}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.imageView}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>

            <View style={styles.bottomContainerView}>
              <SeparatorView />
              <RatingBarView
                upvoteCount={item.upvoteCount}
                downvoteCount={item.downvoteCount}
              />
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

mapStateToProps = ({ item, user, favoriteItemIDs, userVoteItemIDs }) => {
  return { item, user, favoriteItemIDs, userVoteItemIDs };
};

mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchItem,
      toggleFavoriteItem,
      toggleUpvoteItem,
      toggleDownvoteItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);
