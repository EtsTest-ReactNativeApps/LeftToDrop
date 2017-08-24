import React from 'react';

import {
	Alert,
	AsyncStorage,
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ItemScreen extends React.Component {
	render() {
		const { navigate } = this.props.navigation;
		var item = this.props.navigation.state.params.item;
		return(
			<View style={styles.container}>
				<Text style={styles.itemName}>
					{item.name}
				</Text>
				
				<View style={styles.imageView}>
					<Image
						style={styles.image}
						source={{uri: item.image}} />
				</View>

				<View style={styles.caption}>
					<View style={styles.ratingContainer}>

						<TouchableOpacity
							style={styles.copButton}
              onPress={()=>{Alert.alert('Upvoted')}}>
								<Text style={styles.buttonText}>Cop</Text>
						</TouchableOpacity>			
	
						<TouchableOpacity
							style={styles.favoriteButton}
              onPress={this.favoriteItem.bind(this, item._key)}>
							<Text style={styles.buttonText}>Favorite</Text>
						</TouchableOpacity>	

						<TouchableOpacity
							style={styles.dropButton}
              onPress={()=>{Alert.alert('Downvoted')}}>
							<Text style={styles.buttonText}>Drop</Text>
						</TouchableOpacity>

					</View>

					<View style={styles.chat}>
					</View>			

				</View>		
			</View>
		)
	}

	async favoriteItem(key) {
		var favorites = [];

		try {
			favorites = await AsyncStorage.getItem('favorites');
			favorites = JSON.parse(favorites);
		} catch(error) {
			Alert.alert('Load error');
		}
		
		favorites.push(key); 
		
		try {
			await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
		}	catch(error) {
			Alert.alert('Save error');
		}
	}
}

const styles = StyleSheet.create({
	buttonText: {
		color: 'white',
		fontFamily: 'Futura',
		fontStyle: 'italic',
		fontSize: 20,
		textAlign: 'center'
	},
	caption: {
		backgroundColor: 'transparent',
		flex: 1,
		margin: 15,
		marginTop: 0
	},
	chat: {
		backgroundColor: 'lightgray',
		borderRadius: 3,
		flex: 1,
		marginTop: 5
	},
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  copButton: {
    backgroundColor: 'red',
    borderRadius: 3,
    flex: 1,
    justifyContent: 'center',
    marginRight: 2.5,
  },
	dropButton: {
		backgroundColor: 'black',
		borderRadius: 3,
		flex: 1,
		justifyContent: 'center',
		marginLeft: 2.5,
	},
	favoriteButton: {
		backgroundColor: 'blue',
		borderRadius: 3,
		flex: 1,
		justifyContent: 'center',
		marginLeft: 2.5,
		marginRight: 2.5
	},
	image: {
		height: '100%',
		resizeMode: 'contain'
	},
	imageView: {
		backgroundColor: 'white',
		borderRadius: 3,
		flex: 2,
		justifyContent: 'center',
		padding: 10,
		margin: 15,
		marginBottom: 5,
		overflow: 'hidden'
	},
  itemName: {
    color: 'black',
    fontFamily: 'Courier New',
    fontSize: 15,
    margin: 15,
    marginBottom: 0,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
	ratingContainer: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		height: 35,
	},
})
