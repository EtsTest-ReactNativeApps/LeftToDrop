import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import { fetchItems } from '../../actions';

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
        nextScreen="Item"
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { items } = state;
  const { filter } = ownProps.navigation.state.params;

  if (!items) {
    return state;
  }
  return { items: filter(items) };
};

export default connect(mapStateToProps)(ItemsScreen);
