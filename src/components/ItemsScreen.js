import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import fetchItems from '../actions/fetch_items_action';

class ItemsScreen extends Component {
  render() {
    return (
      <TableViewScreen
        fetchAction={fetchItems}
        navigation={this.props.navigation}
        reduxState={this.props.items}
        screen="Items"
      />
    );
  }
}

const mapStateToProps = ({ items }) => {
  return { items };
};

export default connect(mapStateToProps)(ItemsScreen);
