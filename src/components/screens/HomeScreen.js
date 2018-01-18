import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import EmptyView from '../subcomponents/EmptyView';

import { fetchMetadata } from '../../actions/fetch_metadata_action';
import fetchUser from '../../actions/fetch_user_action';

class HomeScreen extends Component {
  // Parent Component owns the back button
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'Back'
  });

  componentWillMount() {
    const { fetchMetadata, fetchUser } = this.props;
    fetchMetadata();
    fetchUser('krlargo');
  }

  render() {
    const { metadata, navigation } = this.props;
    // ID is passed to TableViewScreen's cellData, then passed to CallingScreen from there
    const currentSeasonID = metadata ? metadata.currentSeasonID : null;
    return (
      <TableViewScreen
        staticCellData={[
          {
            id: currentSeasonID,
            label: 'Left To Drop',
            nextScreen: 'Categories'
          },
          {
            id: currentSeasonID,
            label: 'Previous Drops',
            nextScreen: 'Categories'
          },
          { label: 'Seasons', nextScreen: 'Seasons' },
          { label: 'Favorites', nextScreen: 'Favorites' },
          { label: 'Settings', nextScreen: 'Settings' }
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
      fetchUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
