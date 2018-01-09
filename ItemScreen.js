import React from 'react';

import {
	Alert,
	AsyncStorage,
	Button,
	DeviceEventEmitter,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ItemScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFavorite: false,
		};
		item = props.navigation.state.params.item;
		this.isFavorite(item._key);
	}

	render() {
		const { navigate } = this.props.navigation;
		var favoriteLabel = this.state.isFavorite ? 'Unfavorite' : 'Favorite';

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
              onPress={this.setFavorite.bind(this, item._key)}>
							<Text style={styles.buttonText}>{favoriteLabel}</Text>
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

	async getFavorites() {
		favorites = [];

		try { // Try to load
			favorites = await AsyncStorage.getItem('favorites');
			this.setState({
				favorites: JSON.parse(favorites) // Load saved favorites
			});
		} catch(error) {
			this.favorites = favorites; // Keep as new empty array

    	try { // If load fails, try to save []
   	  	await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    	} catch(error) {
      	Alert.alert('Save error');
      	throw error;
    	}

			throw error;
		}
	}

	async isFavorite(key) {
		var favs = [];

		try {
			favs = await AsyncStorage.getItem('favorites');
			favs = JSON.parse(favs);

		} catch(error) {
			Alert.alert('Load error');
			throw error;
		}

		this.setState({
			isFavorite: this.contains(favs,key)
		});
	}

	async setFavorite(key) {
		var favs = [];

		try {
			favs = await AsyncStorage.getItem('favorites');
			favs = JSON.parse(favs);

		} catch(error) {
			Alert.alert('Load error');
			throw error;
		}

		if(this.contains(favs,key)) {
			favs = favs.filter(k => k !== key);
			this.setState({
				isFavorite: false,
			})
		} else {
			favs.push(key)
			this.setState({
				isFavorite: true,
			})
		}

		try {
			await AsyncStorage.setItem('favorites', JSON.stringify(favs));
		}	catch(error) {
			Alert.alert('Save error');
			throw error;
		}

		// Emit notification
		DeviceEventEmitter.emit('favoriteChanged', {});
	}

 	contains(a,obj) {
		if(a === null) {
			Alert.alert('Array is null');
			return false;
		} else if(a === undefined) {
			Alert.alert('Array is undefined');
			return false;
		}

    for(var i = 0; i < a.length; i++) {
      if(a[i] === obj) {
        return true;
      }
    }
    return false;
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
