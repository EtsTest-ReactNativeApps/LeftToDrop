import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import fetchItems from '../actions/fetch_items_action';

class ItemsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    return (
      <TableViewScreen
        fetchAction={fetchItems}
        navigation={this.props.navigation}
        reduxState={this.props.items}
        screen="Item"
      />
    );
  }
}

const mapStateToProps = ({ items }) => {
  return { items };
};

export default connect(mapStateToProps)(ItemsScreen);
