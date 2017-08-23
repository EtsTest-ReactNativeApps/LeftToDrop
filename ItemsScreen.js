import React from 'react';
import * as firebase from 'firebase';

import {
	Button,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import EmptyScreen from './EmptyScreen.js';

const firebaseConfig = {
	apiKey: 'AIzaSyA9QocrVseq9zvO_RI64HGDDf-HLuQYeXw',
	authDomain: 'left-to-drop-9f551.firebaseapp.com',
	databaseURL: 'https://left-to-drop-9f551.firebaseio.com',
	storageBucket: 'left-to-drop-9f551.appspot.com'		
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('items');

export default class ItemsScreen extends React.Component {
	constructor() {
		super();
		
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			})
		};
		this.itemsRef = this.getRef().child('items');
	}

	getRef() {
		return firebaseApp.database().ref();
	}
	
	render() {
		if(this.state.dataSource.getRowCount() === 0) {
			return(<EmptyScreen message="No items listed." />)
		} else {
			return(
				<ListView style={styles.container}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					renderSeparator={(sectionID, rowID) =>
						<View
							key={rowID}
							style={styles.separator}
						/>
					}
				/>
			)
		}
	}

	listenForItems(itemsRef) {
		itemsRef.on('value', (snap) => {
	
			var items = [];
			var category = this.props.navigation.state.params.category;

			snap.forEach((child) => {
				var itemCategory = child.val().category;
				if(itemCategory.toLowerCase() === category.toLowerCase() ||
					 category.toLowerCase() === 'all') {
					items.push({
						// Assign button title to items['name']
						name: child.val().name,
						image: child.val().image,
						_key: child.key
					});
				}
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items)
			});

		});
	}

	componentDidMount() {
		this.listenForItems(this.itemsRef);
	}

	_onPressRow(rowID, item) {
		const { navigate } = this.props.navigation;
		navigate('Item', { item: item });	
	}
	
	_renderRow(item, sectionID, rowID) {
		return(
			<TouchableHighlight
				onPress = {this._onPressRow.bind(this, rowID, item)}
				underlayColor = 'whitesmoke'>
				<View style={styles.cell}>
					<Text style={styles.text}>
						{item.name.toLowerCase()}
					</Text>
				</View>
			</TouchableHighlight>			
		)
	}

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.category,
  });
}

const styles = StyleSheet.create({
	cell: {
		alignItems: 'flex-start',
		flex: 1,
		height: 50,
		justifyContent: 'center'
	},
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	separator: {
		backgroundColor: '#EEEEEE',
		flex: 1,
		height: 1
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		marginLeft: 15,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
})
