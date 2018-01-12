import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import fetchCategories from '../actions/fetch_categories_action';

class CategoriesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    return (
      <TableViewScreen
        fetchAction={fetchCategories}
        navigation={this.props.navigation}
        reduxState={this.props.categories}
        screen="Items"
      />
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps)(CategoriesScreen);
