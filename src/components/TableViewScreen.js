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
      dataSource: dataSource.cloneWithRows(this.props.cellData)
    };
  }

  // Required to handle async Firebase load
  componentWillReceiveProps(newProps) {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
      dataSource: dataSource.cloneWithRows(newProps.cellData)
    });
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
    const cellData = this.props.cellData[rowID];
    navigate(cellData.screen, { id: cellData.id });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={(sectionID, rowID) => (
          <View key={rowID} style={styles.separator} />
        )}
        style={styles.container}
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
