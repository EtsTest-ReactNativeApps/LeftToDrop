import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableViewScreen from './TableViewScreen';
import { fetchWeeks } from '../../actions';

class WeeksScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  emptyTableMessageFunction = () => {
    return this.props.navigation.state.params.id ? null : 'No drops yet.';
  };

  // Propagated in TableViewScreen's onPress()
  nextScreenProps = title => {
    // Pass nextScreenProps based on currentScreen
    switch (title) {
      case 'Left To Drop':
        return {
          filter: array =>
            array.filter(object => {
              const key = Object.keys(object)[0];
              return !object[key].hasOwnProperty('dropdate');
            }),
          emptyTableMessageFunction: nextTitle =>
            `No ${nextTitle.toLowerCase()} left to drop.`
        };
      case 'Previous Drops':
        return {
          filter: array =>
            array.filter(object => {
              const key = Object.keys(object)[0];
              return object[key].hasOwnProperty('dropdate');
            }),
          emptyTableMessageFunction: nextTitle =>
            `No ${nextTitle.toLowerCase()} have dropped.`
        };
    }
  };

  render() {
    const { navigation, weeks } = this.props;
    const { title } = navigation.state.params;

    return (
      <TableViewScreen
        fetchAction={fetchWeeks}
        navigation={navigation}
        reduxState={weeks}
        nextScreen="Items"
        emptyTableMessageFunction={this.emptyTableMessageFunction}
        nextScreenProps={this.nextScreenProps(title)}
      />
    );
  }
}

const mapStateToProps = ({ weeks }) => {
  return { weeks };
};

export default connect(mapStateToProps)(WeeksScreen);
