import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import fetchCategories from '../actions/fetch_categories_action';

class CategoriesScreen extends Component {
  componentDidMount() {
    const seasonID = this.props.navigation.state.params.id;
    this.props.fetchCategories(seasonID);
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

const mapStateToProps = ({ categories }) => {
  if (categories) {
    return {
      cellData: categories.map(category => {
        const id = Object.keys(category)[0];
        const value = category[id];
        const screen = 'Items';
        const text = value['name'];

        return { id, screen, text };
      })
    };
  } else {
    return {
      cellData: []
    };
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCategories }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
