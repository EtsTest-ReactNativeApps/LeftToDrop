import React, { Component } from 'react';
import TableViewScreen from './TableViewScreen';

class HomeScreen extends Component {
  // Parent Component owns the back button
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'Back'
  });

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

export default HomeScreen;
