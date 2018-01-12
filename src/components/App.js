import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import HomeScreen from './HomeScreen';
//import FavoritesScreen from './FavoritesScreen';
import SeasonsScreen from './SeasonsScreen';
import CategoriesScreen from './CategoriesScreen';
import ItemsScreen from './ItemsScreen';
import ItemScreen from './ItemScreen';
import { defaultNavigationOptions } from '../styles';

// Reducers
import reducers from '../reducers';

const Navigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Left To Drop'
      }
    },
    /*Favorites: {
      screen: SeasonsScreen,
      navigationOptions: {
        title: 'Favorites'
      }
    },*/
    Seasons: {
      screen: SeasonsScreen,
      navigationOptions: {
        title: 'Seasons'
      }
    },
    Categories: { screen: CategoriesScreen },
    Items: { screen: ItemsScreen },
    Item: { screen: ItemScreen }
  },
  {
    navigationOptions: defaultNavigationOptions
  }
);

class App extends Component {
  render() {
    <StatusBar backgroundColor="transparent" barStyle="light-content" />;
    const store = createStore(reducers, applyMiddleware(Thunk));
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
