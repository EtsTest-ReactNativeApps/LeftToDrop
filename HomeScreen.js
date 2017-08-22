import React from 'react';
import {
	Alert,
	Button,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

//let titles = ['Left To Drop', 'Already Dropped', 'Favorites'];
//let destinations = ['Categories', 'Categories', 'Favorites'];

export default class HomeScreen extends React.Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		titles = ['Left To Drop', 'Already Dropped', 'Favorites'];
		destinations = ['Categories', 'Categories', 'Favorites'];

		this.state = {
			dataSource: ds.cloneWithRows(titles),
		};
	}

	static navigationOptions = {
		title: 'Left To Drop',
		headerTitleStyle: {
    	fontFamily: 'Futura',
    	fontSize: 20,
			fontStyle: 'italic',
    	//fontWeight: 'bold',			
		},
		headerStyle: {
			backgroundColor: 'red'
		},
		headerTintColor: 'white'
  }

	render() {
		const { navigate } = this.props.navigation;

		return (
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
		);
	}

	_onPressRow(rowID: number) {
		const { navigate } = this.props.navigation;
		navigate(destinations[rowID]);
	}

	_renderRow(rowData: string, sectionID: number, rowID: number) {
		return (
			<TouchableHighlight
				onPress = {this._onPressRow.bind(this, rowID)}
				underlayColor = 'whitesmoke'>
				<View style={styles.cell}>
					<Text style={styles.text}>
						{rowData}
					</Text>
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	cell: {
		alignItems: 'flex-start',
		flex: 1,
		height: 50,
		justifyContent: 'center'
	},
	container: {
		backgroundColor: 'white'
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
		textAlign: 'left',
	},
})
