import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import { fetchItems } from '../../actions';

class ItemsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    const { navigation, items, emptyTableMessageFunction } = this.props;
    return (
      <TableViewScreen
        fetchAction={fetchItems}
        navigation={navigation}
        reduxState={items}
        nextScreen="Item"
        emptyTableMessageFunction={emptyTableMessageFunction}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { items } = state;
  const { nextScreenProps } = ownProps.navigation.state.params;

  if (!items) {
    return state;
  } else if (nextScreenProps) {
    const { filter, emptyTableMessageFunction } = nextScreenProps;

    return {
      items: filter ? filter(items) : items,
      emptyTableMessageFunction: emptyTableMessageFunction
    };
  } else {
    return { items };
  }
};

export default connect(mapStateToProps)(ItemsScreen);
