import React from 'react';
import {
	Button,
	Icon,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SeasonsScreen extends React.Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		seasons = ['FW17'];

		this.state = {
			dataSource: ds.cloneWithRows(seasons),
		};
	}

	render() {
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
		);
	}

	_onPressRow(rowID) {
		const { navigate } = this.props.navigation;
		navigate('Categories', { season: seasons[rowID]});
	}

	_renderRow(rowData, sectionID, rowID) {
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

	static navigationOptions = ({ navigation }) => ({
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
		textAlign: 'center',
		textAlignVertical: 'center'
	},
})
