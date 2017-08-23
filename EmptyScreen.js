import React from 'react';

import {
	StyleSheet,
	Text,
	View
}	from 'react-native';

export default class EmptyScreen extends React.Component {
	render() {
		return(
			<View style={styles.container}>
				<Text style={styles.text}>
					{this.props.message}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		marginTop: 15,
		textAlign: 'center',
	}
});
