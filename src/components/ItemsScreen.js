import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import fetchItems from '../actions/fetch_items_action';

class ItemsScreen extends Component {
  componentDidMount() {
    const categoryID = this.props.navigation.state.params.id;
    this.props.fetchItems(categoryID);
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

const mapStateToProps = ({ items }) => {
  if (items) {
    return {
      cellData: items.map(item => {
        const id = Object.keys(item)[0];
        const value = item[id];
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
  return bindActionCreators({ fetchItems }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);
