import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { StatusBar, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import SeasonsScreen from './SeasonsScreen';
import CategoriesScreen from './CategoriesScreen';
import ItemsScreen from './ItemsScreen';
import ItemScreen from './ItemScreen';
import SettingsScreen from './SettingsScreen';

import reducers from '../../reducers';
import { defaultNavigationOptions } from '../../styles';

const Navigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Left To Drop'
      }
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        title: 'Favorites'
      }
    },
    Seasons: {
      screen: SeasonsScreen,
      navigationOptions: {
        title: 'Seasons'
      }
    },
    Categories: { screen: CategoriesScreen },
    Items: { screen: ItemsScreen },
    Item: { screen: ItemScreen },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: { title: 'Settings' }
    }
  },
  {
    navigationOptions: defaultNavigationOptions
  }
);

class App extends Component {
  render() {
    const store = createStore(reducers, applyMiddleware(Thunk));
    return (
      <Provider store={store}>
        <Navigator>
          <StatusBar barStyle="light-content" />
        </Navigator>
      </Provider>
    );
  }
}

export default App;
