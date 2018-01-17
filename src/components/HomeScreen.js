import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmptyView from './EmptyView';
import TableViewScreen from './TableViewScreen';
import { fetchFavorites } from '../actions/fetch_favorites_action';
import {
  fetchUpvotedItemIDs,
  fetchDownvotedItemIDs
} from '../actions/fetch_voted_items_action';
import { fetchMetadata } from '../actions/fetch_metadata_action';

class HomeScreen extends Component {
  // Parent Component owns the back button
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'Back'
  });

  componentWillMount() {
    const {
      fetchMetadata,
      fetchFavorites,
      fetchUpvotedItemIDs,
      fetchDownvotedItemIDs
    } = this.props;
    fetchMetadata();
    fetchFavorites('krlargo');
    fetchUpvotedItemIDs('krlargo');
    fetchDownvotedItemIDs('krlargo');
  }

  render() {
    const { metadata, navigation } = this.props;
    // ID is passed to TableViewScreen's cellData, then passed to CallingScreen from there
    const currentSeasonID = metadata ? metadata.currentSeasonID : null;
    return (
      <TableViewScreen
        staticCellData={[
          // Shows currentSeason's remainingItems
          {
            id: currentSeasonID,
            label: 'Left To Drop',
            nextScreen: 'Categories'
          },
          // Show's currentSeason's droppedItems
          {
            id: currentSeasonID,
            label: 'Previous Drops',
            nextScreen: 'Categories'
          },
          // Shows previousSeasons
          { label: 'Seasons', nextScreen: 'Seasons' },
          // Shows favorites
          { label: 'Favorites', nextScreen: 'Favorites' }
        ]}
        navigation={navigation}
      />
    );
  }
}

const mapStateToProps = ({ metadata }) => {
  return { metadata };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchMetadata,
      fetchFavorites,
      fetchUpvotedItemIDs,
      fetchDownvotedItemIDs
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
