import React from 'react';
import * as firebase from 'firebase';

import {
	Button,
	Image,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import GridView from 'react-native-gridview';

import EmptyScreen from './EmptyScreen.js';

const itemsPerRow = 3;

export default class FavoritesScreen extends React.Component {
	constructor() {
		super();
		
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r2 !== r2,
			})
		}
	}

	render() {
		//if(this.state.dataSource.getRowCount() === 0) {
			return(<EmptyScreen message="No favorited items." />)
		/*} else {
			return(
				<View style={styles.container}>
					<ListView contentContainerStyle={styles.listView}
						dataSource={this.state.dataSource}
						renderRow={this._renderCell.bind(this)}
					/>
				</View>
			);
		}*/
	}

	_onPressCell(cellID) {
		const { navigate } = this.props.navigation;
		navigate('Item', { item: items[cellID]});
	}

	_renderCell(cellData, sectionID, rowID) {
		return(
			<View style={styles.cell}>
				<TouchableOpacity
					onPress = {this._onPressCell.bind(this, rowID)}>
					<Image 
						style={styles.cellImage}
						source={{uri: cellData}} />
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	cell: {
		aspectRatio: 1,
		backgroundColor: 'white',
		borderRadius: 3,
		justifyContent: 'center',
		margin: '1.5%',
		overflow: 'hidden',
		width: '30%',
	},
	cellImage: {
		height: 100,
		resizeMode: 'contain'
	},
	container: {
		backgroundColor: 'whitesmoke',
		flex: 1,
	},
	listView:{
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		padding: '1%'
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	view: {
		backgroundColor: 'white',
		flex: 1,
	}
});
