/*
  - Used as generic Component for all Firebase data that should be displayed in a Table/ListView

  - Calling Component will pass as props:
    REQUIRED
    - navigation = {this.props.navigation}
      - Used to propagate StackNavigator props to TableViewScreen
      - Unchanged throughout calling Components
    - 'nextScreen':
      - The name of the screen that all cells will redirect to
      - e.g. All SeasonsScreen cells should redirect to CategoriesScreen onPress

    WHEN USING DYNAMIC TABLE DATA
    - 'fetchAction':
      - The corresponding ActionCreator responsible for fetching data for particular screen
      - Imported inside calling Component's mapDispatchToProps()
    - 'reduxState':
      - The corresponding Redux state associated with data fetch
      - Propagated from calling Component's mapStateToProps()

    WHEN USING STATIC TABLE DATA
    - staticCellData:
      - A static array of cellData objects, containing the following properties:
        REQUIRED
        - 'nextScreen': Destination screen for cell to navigate to onPress
        - 'label': Text for cell's label

        CONDITIONAL
        - 'id':
          - Used to specify parentID if required for data fetching
          - e.g. Navigating directly to CategoriesScreen for 'Previous Drops' requires a SeasonID to load

        OPTIONAL
        - 'title': Destination screen's NavBar title; label is used by default

  - When extracting cellData from state:
    - State should be an array of objects:
      [ {id: { KEY: VALUE, ...} }, ...]
    - State will be parsed into cellData:
      [ {id: ID, label: LABEL, nextScreen: SCREEN, title: TITLE}, ...]
    - 'name' field which will be used as cell label
    - 'nextScreen' field is provided via props (noted above),

*/

import React, { Component } from 'react';
import {
  Button,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import EmptyView from '../subcomponents/EmptyView';
import SeparatorView from '../subcomponents/SeparatorView';

import { defaultStyles, listViewStyles } from '../../styles';

class TableViewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellData: this.extractCellDataFromProps(props)
    };
  }

  componentWillMount() {
    if (this.props.fetchAction) {
      const parentID = this.props.navigation.state.params.id;
      this.props.fetchAction(parentID);
    }
  }

  // Clear Redux state on exit; this might not even be doing anything
  componentWillUnmount() {
    // Action Creators are defined to clear state when passed a null parameter
    if (this.props.fetchAction) {
      this.props.fetchAction();
    }
  }

  // Required to handle async data fetching
  componentWillReceiveProps(props) {
    this.setState({
      cellData: this.extractCellDataFromProps(props)
    });
  }

  extractCellDataFromProps(props) {
    const { reduxState, staticCellData } = props;

    if (reduxState) {
      // If passed state, construct cellData here
      const dynamicCellData = reduxState.map(stateData => {
        // When cell is tapped, id is propagated to next screen to fetch cellData
        const id = Object.keys(stateData)[0];
        const value = stateData[id];
        const label = value['name'];
        const image = value['image'];
        const nextScreen = props.nextScreen;

        return { id, label, image, nextScreen };
      });

      return dynamicCellData;
    } else if (staticCellData) {
      return staticCellData;
    } else {
      return [];
    }
  }

  onPressRow(cellData, rowID) {
    const { nextScreenProps, navigation } = this.props;
    const { id, label, nextScreen, title } = cellData;
    navigation.navigate(nextScreen, {
      id,
      title: title || label,
      nextScreenProps
    });
  }

  renderRow(cellData, _, rowID) {
    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
        onPress={this.onPressRow.bind(this, cellData, rowID)}
      >
        <View style={listViewStyles.cell}>
          {(() => {
            if (cellData.image) {
              return (
                <View style={listViewStyles.imageView}>
                  <Image
                    style={listViewStyles.image}
                    source={{
                      uri: cellData.image
                    }}
                  />
                </View>
              );
            }
          })()}
          <Text style={[defaultStyles.text, listViewStyles.text]}>
            {cellData.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.cellData == null) {
      return <EmptyView message="Loading..." />;
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.state.cellData);

    if (dataSource.getRowCount() == 0) {
      const { navigation, emptyTableMessageFunction } = this.props;
      const { title } = navigation.state.params;
      const message = emptyTableMessageFunction
        ? emptyTableMessageFunction(title)
        : 'No data loaded.';

      return <EmptyView message={message} />;
    } else {
      return (
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
          style={defaultStyles.containerView}
        />
      );
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ fetchAction: ownProps.fetchAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(TableViewScreen);
