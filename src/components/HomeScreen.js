import React, { Component } from 'react';
import TableViewScreen from './TableViewScreen';

class HomeScreen extends Component {
  render() {
    return (
      <TableViewScreen
        staticCellData={[
          { label: 'Left To Drop', screen: 'Seasons' },
          { label: 'Previous Drops', screen: 'Seasons' },
          { label: 'Favorites', screen: 'Seasons' }
        ]}
        navigation={this.props.navigation}
      />
    );
  }
}

export default HomeScreen;
