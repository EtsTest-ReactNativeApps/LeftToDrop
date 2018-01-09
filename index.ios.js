import React from 'react';
import * as firebase from 'firebase';

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

const firebaseConfig = {
  apiKey: 'AIzaSyA9QocrVseq9zvO_RI64HGDDf-HLuQYeXw',
  authDomain: 'left-to-drop-9f551.firebaseapp.com',
  databaseURL: 'https://left-to-drop-9f551.firebaseio.com',
  storageBucket: 'left-to-drop-9f551.appspot.com'
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('items');

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

const Navigator = StackNavigator({
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

class LeftToDrop extends React.Component {
	render() {
		return <Navigator screenProps={firebaseApp}/>
	}
}

AppRegistry.registerComponent('LeftToDrop', () => LeftToDrop);
