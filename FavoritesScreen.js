import React from 'react';
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

const itemsPerRow = 3;

export default class FavoritesScreen extends React.Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		/*favorites = [
			'./CFXseLxWv_M.jpg',
			'./oq-LV1EbVN4.jpg',
			'./jRkasa75KqM.jpg',
			'./Ln4sypHd_mE.jpg',
			'./wLD0euirh5M.jpg',
			'./eaH53yZdTfE.jpg',
			'./FP4UwEfjns1.jpg',	
			'./YKD4PSmi0uE.jpg'
		]*/

		favorites = [
			'http://d17ol771963kd3.cloudfront.net/136407/zo/Ln4sypHd_mE.jpg',
			'http://d17ol771963kd3.cloudfront.net/136348/zo/wLD0euirh5M.jpg',
			'http://d17ol771963kd3.cloudfront.net/133570/zo/eaH53yZdTfE.jpg',
			'http://d17ol771963kd3.cloudfront.net/135346/zo/FP4UwEfjns1.jpg',
			'http://d17ol771963kd3.cloudfront.net/135974/zo/va2IbTenMUg.jpg',
			'http://d17ol771963kd3.cloudfront.net/133833/zo/CFXseLxWv_M.jpg'
		]

		this.state = {
			dataSource: ds.cloneWithRows(favorites),
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<ListView contentContainerStyle={styles.listView}
					dataSource={this.state.dataSource}
					renderRow={this._renderCell.bind(this)}
				/>
			</View>
		);
	}

	_onPressCell(cellID: number) {
		const { navigate } = this.props.navigation;
		navigate('Item', { item: items[cellID]});
	}

	_renderCell(cellData: string, sectionID: number, rowID: number) {
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
