import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
//import FavoritesScreen from './FavoritesScreen';
import SeasonsScreen from './SeasonsScreen';
/*import CategoriesScreen from './CategoriesScreen';
import ItemsScreen from './ItemsScreen';
import ItemScreen from './ItemScreen';*/

var defaultNavOptions = () => {
  return {
    headerTitleStyle: {
      fontFamily: 'Futura',
      fontSize: 25,
      fontStyle: 'italic'
    },
    headerStyle: {
      backgroundColor: 'red'
    },
    headerTintColor: 'white'
  };
};

const Navigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Left To Drop'
      }
    },
    Favorites: {
      screen: SeasonsScreen /*FavoritesScreen*/,
      navigationOptions: {
        title: 'Favorites'
      }
    },
    Seasons: { screen: SeasonsScreen }
    /*Categories: { screen: CategoriesScreen },
    Items: { screen: ItemsScreen },
    Item: { screen: ItemScreen }*/
  },
  {
    navigationOptions: defaultNavOptions()
  }
);

class App extends Component {
  render() {
    return <Navigator />;
  }
}

export default App;
