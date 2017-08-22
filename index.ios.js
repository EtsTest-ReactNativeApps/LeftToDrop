import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen.js';
import FavoritesScreen from './FavoritesScreen.js';
import SeasonsScreen from './SeasonsScreen.js';
import CategoriesScreen from './CategoriesScreen.js';
import ItemsScreen from './ItemsScreen.js';
import ItemScreen from './ItemScreen.js';

var defaultNavOptions = () => {
	return({
		headerTitleStyle: {
			fontFamily: 'Futura',
			fontSize: 20,
			fontStyle: 'italic'
		},
		headerStyle: {
			backgroundColor: 'red'
		},
		headerTintColor: 'white'
	})
}

const LeftToDrop = StackNavigator({
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
	Seasons: {screen: SeasonsScreen},
	Categories: {screen: CategoriesScreen},
	Items: {screen: ItemsScreen},
	Item: {screen: ItemScreen}
}, {
	navigationOptions: defaultNavOptions()
});

AppRegistry.registerComponent('LeftToDrop', () => LeftToDrop);
