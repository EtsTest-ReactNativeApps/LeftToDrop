import React from 'react';

import {
	StyleSheet,
	Text,
	View
}	from 'react-native';

export default class LoadingScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			frame: 0,
			text: ['Loading', ' Loading.', '  Loading..', '   Loading...']
		};

		setInterval(() => {
			this.setState(prevState => {
				return { frame: (prevState.frame+1) % 4 };
			});
		}, 500);
	}	

	render() {
		let display = this.state.text[this.state.frame % 4];
		return(
			<View style={styles.container}>
				<Text style={styles.text}>
					{display}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		marginTop: 15,
		textAlign: 'center',
	}
});
