import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import { fetchSeasons } from '../actions';

class SeasonsScreen extends Component {
  componentDidMount() {
    this.props.fetchSeasons();
  }

  render() {
    return (
      <TableViewScreen
        cellData={this.props.cellData}
        navigation={this.props.navigation}
      />
    );
  }
}

/*
  Get raw seasons data from Firebase, parse into appropriate cellData:
  - id: used for propagated navigation
  (e.g. clicking on SEASON_ID_1 will lead to SEASON_ID_1's categories)
  - screen: the following screen to be routed to
  - text: cell's text display
*/
const mapStateToProps = ({ seasons }) => {
  if (seasons) {
    const seasonNames = Object.keys(seasons);

    return {
      cellData: seasonNames.map(name => {
        return {
          id: name,
          screen: 'Categories',
          text: name
        };
      })
    };
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSeasons }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonsScreen);
