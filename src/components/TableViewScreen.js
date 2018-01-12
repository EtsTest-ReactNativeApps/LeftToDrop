import React, { Component } from 'react';
import {
  Button,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

  componentDidMount() {
    if (this.props.fetchAction) {
      const parentID = this.props.navigation.state.params.id;
      this.props.fetchAction(parentID);
    }
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

mapStateToProps = (_, ownProps) => {
  // SubComponents can either have loaded 'state' or passed static 'cellData'
  const state = ownProps.reduxState;
  const cellData = ownProps.staticCellData;
  if (state) {
    // If passed state, construct cellData here
    return {
      cellData: state.map(stateData => {
        const id = Object.keys(stateData)[0];
        const value = stateData[id];
        const screen = ownProps.screen;
        const text = value['name'];

        return { id, screen, text };
      })
    };
  } else if (cellData) {
    // Static data if no state is passed
    return { cellData };
  } else {
    // Temporary empty array when no cellData is available
    return {
      cellData: []
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ fetchAction: ownProps.fetchAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TableViewScreen);

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
