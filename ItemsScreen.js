import React from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ItemsScreen extends React.Component {
	render() {
		const { navigate } = this.props.navigation;
		const { params } = this.props.navigation.state;
		return(
			<View style={styles.view}>
				<Button
					onPress={() => navigate('Item')}
					title="Box Logo Tee"
				/>
			</View>
		)
	}

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.category,
  });
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
