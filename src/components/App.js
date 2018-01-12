import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

// Components
import HomeScreen from './HomeScreen';
//import FavoritesScreen from './FavoritesScreen';
import SeasonsScreen from './SeasonsScreen';
import CategoriesScreen from './CategoriesScreen';
import ItemsScreen from './ItemsScreen';
//import ItemScreen from './ItemScreen';

// Reducers
import reducers from '../reducers';

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
    Categories: {
      screen: CategoriesScreen
    },
    Items: {
      screen: ItemsScreen
    }
  },
  {
    navigationOptions: defaultNavOptions()
  }
);

class App extends Component {
  render() {
    const store = createStore(reducers, applyMiddleware(Thunk));
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
