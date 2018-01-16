/*
  - Used as generic Component for all Firebase data that should be displayed in a Table/ListView

  - Calling Component will pass as props:
    REQUIRED
    - navigation = {this.props.navigation}
      - Used to propagate StackNavigator props to TableViewScreen
      - Unchanged throughout calling Components
    - 'screen':
      - The name of the screen that all cells will redirect to
      - e.g. All SeasonsScreen cells should redirect to CategoriesScreen onPress

    WHEN USING DYNAMIC TABLE DATA
    - 'fetchAction':
      - The corresponding ActionCreator responsible for fetching data for particular screen
      - Imported inside calling Component
    - 'reduxState':
      - The corresponding Redux state associated with data fetch
      - Acquired via mapStateToProps() which is connected in calling Component

    WHEN USING STATIC TABLE DATA
    - staticCellData:
      - A static array of cellData objects, containing the following properties:
        REQUIRED
        - 'screen': Destination screen for cell to navigate to onPress
        - 'label': Text for cell's label

        CONDITIONAL
        - 'id':
          - Used to specify parentID if required for data fetching
          - e.g. Navigating directly to CategoriesScreen for 'Previous Drops' requires a SeasonID to load

        OPTIONAL
        - 'title': Destination screen's NavBar title; label is used by default

  - When extracting cellData from state:
    - State should be an array of objects:
      [ {id: { KEY: VALUE, ... } }, ... ]
    - State will be parsed into cellData:
      [ {id: ID, label: LABEL, screen: SCREEN, title: TITLE}, ...]
    - 'name' field which will be used as cell label
    - 'screen' field is provided via props (noted above),

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
    const { id, label, screen, title } = cellData;
    navigate(screen, { id, title: title || label });
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

  renderSeparator(sectionID, rowID, lastRow) {
    return rowID == lastRow ? null : (
      <View key={rowID} style={defaultStyles.separator} />
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
          renderSeparator={(sectionID, rowID) =>
            this.renderSeparator(sectionID, rowID, dataSource.getRowCount() - 1)
          }
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
    console.log('STATE: ' + JSON.stringify(state));
    console.log(
      'CELLDATA: ' +
        JSON.stringify(
          state.map(stateData => {
            // When cell is tapped, id is propagated to next screen to fetch cellData
            const id = Object.keys(stateData)[0];
            const value = stateData[id];
            const label = value['name'];
            const screen = ownProps.screen;

            return { id, label, screen };
          })
        )
    );

    // If passed state, construct cellData here
    return {
      cellData: state.map(stateData => {
        // When cell is tapped, id is propagated to next screen to fetch cellData
        const id = Object.keys(stateData)[0];
        const value = stateData[id];
        const label = value['name'];
        const screen = ownProps.screen;

        return { id, label, screen };
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
