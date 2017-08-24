import React from 'react';
import * as firebase from 'firebase';

import {
	Button,
	Image,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import EmptyScreen from './EmptyScreen.js';

export default class ItemsScreen extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			})
		};
		this.firebaseApp = props.screenProps;
		this.itemsRef = this.firebaseApp.database().ref().child('items');
	}

	getRef() {
		return this.props.firebaseApp.database().ref();
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
		firebaseApp = this.props.navigation.state.params.firebaseApp
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
					<Image
						style={styles.thumbnailImage}
						source={{uri: item.image}} />
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
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		height: 50,
		justifyContent: 'center',
		padding: 5,
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
		flex: 1,
		flexDirection: 'row',
		fontFamily: 'Courier New',
		fontSize: 15,
		marginLeft: 15,
		textAlign: 'left',
	},
	thumbnailImage: {
		aspectRatio: 1,
		height: '100%',
		resizeMode: 'contain'
	}
})
