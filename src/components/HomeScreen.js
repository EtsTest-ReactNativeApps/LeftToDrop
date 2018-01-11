import React, { Component } from 'react';
import TableViewScreen from './TableViewScreen';

class HomeScreen extends Component {
  render() {
    return (
      <TableViewScreen
        cellData={[
          { text: 'Left To Drop', screen: 'Seasons' },
          { text: 'Previous Drops', screen: 'Seasons' },
          { text: 'Favorites', screen: 'Seasons' }
        ]}
        navigation={this.props.navigation}
      />
    );
  }
}

export default HomeScreen;
