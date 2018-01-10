import React, { Component } from 'react';
import {
  Button,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class HomeScreen extends Component {
  constructor() {
    super();

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    destinations = [
      {
        text: 'Left To Drop',
        screen: 'Seasons'
      },
      {
        text: 'Already Dropped',
        screen: 'Seasons'
      },
      {
        text: 'Favorites',
        screen: 'Favorites'
      }
    ];

    this.state = {
      dataSource: dataSource.cloneWithRows(destinations)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor="whitesmoke">
        <View style={styles.cell}>
          <Text style={styles.text}>{rowData.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  /*onPressRow(rowID) {
    const { navigate } = this.props.navigation;
    navigate(destinations[rowID].screen);
  }*/

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={(sectionID, rowID) => (
          <View key={rowID} style={styles.separator} />
        )}
      />
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  cell: {
    alignItems: 'flex-start',
    flex: 1,
    height: 50,
    justifyContent: 'center'
  },
  container: {
    backgroundColor: 'white'
  },
  separator: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    height: 1
  },
  text: {
    color: 'black',
    fontFamily: 'Courier New',
    fontSize: 15,
    marginLeft: 15,
    textAlign: 'left'
  }
});
