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

var defaultNavOptions = (title) => {
	return({
		title: title,
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
		navigationOptions: defaultNavOptions('Left To Drop')
	},
	Favorites: {
		screen: FavoritesScreen,
		navigationOptions: defaultNavOptions('Favorites')
	},
	Seasons: {
		screen: SeasonsScreen,
		navigationOptions: defaultNavOptions('Seasons')
	},
	Categories: {
		screen: CategoriesScreen,
		navigationOptions: defaultNavOptions('Categories')
	},
	Items: {
		screen: ItemsScreen,
		navigationOptions: defaultNavOptions('Items')	
	},
	Item: {
		screen: ItemScreen,
		navigationOptions: defaultNavOptions('Item')
	 }
});

AppRegistry.registerComponent('LeftToDrop', () => LeftToDrop);
