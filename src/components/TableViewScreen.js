import React, { Component } from 'react';
import {
  Button,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class TableViewScreen extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.destinations)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        onPress={this.onPressRow.bind(this, rowID)}
      >
        <View style={styles.cell}>
          <Text style={styles.text}>{rowData.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  onPressRow(rowID) {
    const { navigate } = this.props.navigation;
    navigate(this.props.destinations[rowID].screen);
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={(sectionID, rowID) => (
          <View key={rowID} style={styles.separator} />
        )}
      />
    );
  }
}

export default TableViewScreen;

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
    fontSize: 20,
    marginLeft: 15,
    textAlign: 'left'
  }
});
