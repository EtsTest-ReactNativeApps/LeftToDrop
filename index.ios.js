import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen.js';
import SeasonsScreen from './SeasonsScreen.js';
import CategoriesScreen from './CategoriesScreen.js';
import ItemsScreen from './ItemsScreen.js';
import ItemScreen from './ItemScreen.js';

const LeftToDrop = StackNavigator({
  Home: { screen: HomeScreen },			// Left To Drop, Already Dropped
	Seasons: { screen: SeasonsScreen }, 			// e.g. SS17, FW17, SS18
	Categories: { screen: CategoriesScreen }, // e.g. all, jackets, shirts
	Items: { screen: ItemsScreen },						// e.g. box logo, nas
	Item: { screen: ItemScreen }							// e.g. individual item w/ rating
});

AppRegistry.registerComponent('LeftToDrop', () => LeftToDrop);
