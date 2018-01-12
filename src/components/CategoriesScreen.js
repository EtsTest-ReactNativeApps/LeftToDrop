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
        return {
          id: category.name,
          screen: 'Categories',
          text: category.name
        };
      })
    };
  } else {
    return {
      cellData: [
        { id: 'id', text: 'CAT1', screen: 'Categories' },
        { id: 'id', text: 'CAT2', screen: 'Categories' },
        { id: 'id', text: 'CAT3', screen: 'Categories' }
      ]
    };
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCategories }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
