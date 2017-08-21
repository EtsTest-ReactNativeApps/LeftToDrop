import React, { Component } from 'react'
import {
	StyleSheet,
	View,
} from 'react-native'

export default class AboutContainer extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<View style = { styles.view }>
				<Text style = { styles.text }>
					Hypebeast ass nigga
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Futura'
  },
  view: {
    backgroundColor: 'green',
    flex: 1
  }
})

