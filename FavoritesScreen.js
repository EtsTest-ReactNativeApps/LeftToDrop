import React from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SeasonsScreen extends React.Component {
	render() {
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.view}>
				<Text style={styles.text}>Favorites are here</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
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
})
