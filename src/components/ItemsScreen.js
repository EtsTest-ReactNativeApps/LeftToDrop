import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TableViewScreen from './TableViewScreen';
import fetchItems from '../actions/fetch_items_action';

class ItemsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    // If a filter is provided, use it
    const { navigation, items } = this.props;
    console.log('ITEMS: ' + items);
    return (
      <TableViewScreen
        fetchAction={fetchItems}
        navigation={navigation}
        reduxState={items}
        screen="Item"
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //return { items: state.items };
  // Hold here until items load
  const { items } = state;
  const { customProps } = ownProps.navigation.state.params;
  if (!items) {
    return state;
  } else if (customProps && customProps.items && customProps.items.filter) {
    //} else if (((customProps || {}).items || {}).filter || {}) {
    const { filter } = customProps.items;
    return { items: filter(items) };
  } else {
    return { item };
  }
};

export default connect(mapStateToProps)(ItemsScreen);
