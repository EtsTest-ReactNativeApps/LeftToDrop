/*
  - Used as generic Component for all Firebase data that should be displayed in a Table/ListView

  - Calling Component will pass as props:
    - fetchAction: (Optional)
      - The corresponding ActionCreator responsible for loading Firebase data
      - Imported inside calling Component
    - navigation={this.props.navigation}
      - Used to propagate StackNavigator props to TableViewScreen
      - Unchanged throughout calling Components
    - reduxState: (Optional)
      - The corresponding Redux state associated with data fetch
      - Acquired via mapStateToProps() which is connected in calling Component
    - screen:
      - The name of the screen that all cells will redirect to
      - e.g. All SeasonsScreen cells should redirect to CategoriesScreen onPress
    - staticCellData: (Optional)
      - Static data to be provided when not using dynamic Firebase data

  - When extracting cellData from state:
    - State should be an array of objects where key = object id
    - State will be parsed into the following structure:
        id: { name: 'NAME', ...}
    - 'name' field which will be used as cell label
    - 'screen' field is provided via props (noted above),

  - When providing staticCellData, each cell should provide:
    - destination 'screen' field onPressRow
    - 'label' field for cell label
*/

import React, { Component } from 'react';
import { Button, ListView, Text, TouchableHighlight, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import EmptyView from './EmptyView';
import { defaultStyles, tableViewScreenStyles as styles } from '../styles';

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

  componentWillMount() {
    if (this.props.fetchAction) {
      const parentID = this.props.navigation.state.params.id;
      this.props.fetchAction(parentID);
    }
  }

  // Clear Redux state on exit
  componentWillUnmount() {
    // Action Creators are defined to clear state when passed a null parameter
    if (this.props.fetchAction) {
      this.props.fetchAction();
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

  onPressRow(cellData, rowID) {
    const { navigate } = this.props.navigation;
    navigate(cellData.screen, { id: cellData.id, title: cellData.label });
  }

  renderRow(cellData, _, rowID) {
    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        onPress={this.onPressRow.bind(this, cellData, rowID)}
      >
        <View style={styles.cell}>
          <Text style={[defaultStyles.text, styles.text]}>
            {cellData.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { dataSource, isLoading } = this.state;
    if (isLoading) {
      return <EmptyView message="Loading..." />;
    } else if (dataSource.getRowCount() == 0) {
      return <EmptyView message="Failed to load data." />;
    } else {
      return (
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={(sectionID, rowID) => (
            <View key={rowID} style={styles.separator} />
          )}
          style={defaultStyles.containerView}
        />
      );
    }
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
        const label = value['name'];

        return { id, screen, label };
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
