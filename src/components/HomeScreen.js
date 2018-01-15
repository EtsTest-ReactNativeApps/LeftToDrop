import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import { fetchFavoriteItemIDs } from '../actions/fetch_favorites_action';

class HomeScreen extends Component {
  // Parent Component owns the back button
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'Back'
  });

  componentDidMount() {
    this.props.fetchFavoriteItemIDs('krlargo');
  }

  render() {
    return (
      <TableViewScreen
        staticCellData={[
          { label: 'Left To Drop', screen: 'Seasons' },
          { label: 'Previous Drops', screen: 'Seasons' },
          { label: 'Favorites', screen: 'Favorites' }
        ]}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchFavoriteItemIDs }, dispatch);
};

export default connect(null, mapDispatchToProps)(HomeScreen);
