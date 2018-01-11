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

const mapStateToProps = ({ seasons }) => {
  if (seasons) {
    const seasonNames = Object.keys(seasons);

    return {
      cellData: seasonNames.map(name => {
        return {
          text: name,
          screen: 'Categories'
        };
      })
    };
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSeasons }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonsScreen);
