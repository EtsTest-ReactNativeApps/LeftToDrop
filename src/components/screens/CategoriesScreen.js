import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import { fetchCategories } from '../../actions/fetch_categories_action';

class CategoriesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  // Determines how ItemScreen should be filtered
  getFilterFunction = () => {
    const { title } = this.props.navigation.state.params;
    switch (title) {
      case 'Left To Drop':
        return array =>
          array.filter(object => {
            const key = Object.keys(object)[0];
            return !object[key].hasOwnProperty('dropDate');
          });
      case 'Previous Drops':
        return array =>
          array.filter(object => {
            const key = Object.keys(object)[0];
            return object[key].hasOwnProperty('dropDate');
          });
      // Unfiltered
      default:
        return array => array;
    }
  };

  render() {
    const { navigation, categories } = this.props;
    const { title } = navigation.state.params;

    return (
      <TableViewScreen
        fetchAction={fetchCategories}
        navigation={navigation}
        reduxState={categories}
        prevScreenTitle={title}
        nextScreen="Items"
        nextFilter={this.getFilterFunction()}
      />
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default connect(mapStateToProps)(CategoriesScreen);
