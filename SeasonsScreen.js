import React from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SeasonsScreen extends React.Component {
	static navigationOptions = {
		title: 'Seasons',
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
		return(
			<View style={styles.view}>
				<Text style={styles.text}>Select season here</Text>
				<Button
					onPress={() => navigate('Categories')}
					title="FW16"
				/>
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
