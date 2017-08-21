import React from 'react';
import {
	Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Router extends Component {
	static navigationOptions = {
		title: 'Left To Drop'
	};

	render() {
		return (
			<View style={styles.view}>
				<Text style={styles.text}>
					Welcome
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		color: 'white'
	},
	view: {
		backgroundColor: 'red'
	}
})
