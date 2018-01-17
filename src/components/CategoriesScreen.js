import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import fetchCategories from '../actions/fetch_categories_action';

class CategoriesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    const { navigation, categories } = this.props;
    const { customProps } = navigation.state.params;
    return (
      <TableViewScreen
        fetchAction={fetchCategories}
        navigation={navigation}
        reduxState={categories}
        screen="Items"
        customProps={customProps}
      />
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps)(CategoriesScreen);
