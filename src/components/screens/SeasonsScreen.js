import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import fetchSeasons from '../../actions/fetch_seasons_action';

class SeasonsScreen extends Component {
  render() {
    return (
      <TableViewScreen
        fetchAction={fetchSeasons}
        navigation={this.props.navigation}
        reduxState={this.props.seasons}
        nextScreen="Categories"
      />
    );
  }
}

const mapStateToProps = ({ seasons }) => {
  return { seasons };
};

export default connect(mapStateToProps)(SeasonsScreen);
