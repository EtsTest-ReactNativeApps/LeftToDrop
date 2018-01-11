import React, { Component } from 'react';
import TableViewScreen from './TableViewScreen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCategories } from '../actions';

class CategoriesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  setDestinations() {
    if (!this.props.categories) {
      return [];
    }
    const categoryNames = Object.keys(this.props.categories);
    return categoryNames.map(name => {
      return {
        text: name,
        screen: 'Items'
      };
    });
  }

  render() {
    return (
      <TableViewScreen
        destinations={this.setDestinations()}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCategories }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(categoriesScreen);
