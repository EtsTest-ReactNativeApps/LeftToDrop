'use strict'

import React, {
	Component
} from 'react';
import {
	ListView,
	RecyclerViewBackedScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
//import * as firebase from "firebase";

var TEST_DATA = [
  {
    "name": "Box Logo Hooded Sweatshirt",
    "season": "FW17",
    "category": "sweatshirts",
    "image": "http://d17ol771963kd3.cloudfront.net/133833/zo/CFXseLxWv_M.jpg",
    "price": null,
    "release_date": null,
    "pre_num_yes": 100,
    "pre_num_no": 0,
    "post_num_yes": 4,
    "post_num_no": 6
  },
  {
    "name": "Nas Tee",
    "season": "FW17",
    "category": "t-shirts",
    "image": "http://d17ol771963kd3.cloudfront.net/136407/zo/Ln4sypHd_mE.jpg",
    "price": null,
    "release_date": null,
    "pre_num_yes": 9,
    "pre_num_no": 1,
    "post_num_yes": 8,
    "post_num_no": 2
  },
  {
    "name": "Dollar Tee",
    "season": "FW16",
    "category": "t-shirts",
    "image": "http://d17ol771963kd3.cloudfront.net/136281/zo/b3sQTINfrVI.jpg",
    "price": 44,
    "release_date": "9/23",
    "pre_num_yes": 5,
    "pre_num_no": 5,
    "post_num_yes": 2,
    "post_num_no": 10
  }
];

const firebaseConfig = {
	apiKey: "AIzaSyA9QocrVseq9zvO_RI64HGDDf-HLuQYeXw",
	authDomain: "left-to-drop-9f551.firebaseapp.com",
	databaseURL: "https://left-to-drop-9f551.firebaseio.com",
	storageBucket: "left-to-drop-9f551.appspot.com"
};
//const firebaseApp = firebase.initializeApp(firebaseConfig);

class SeasonPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			})
		};
		this.itemsRef = this.getRef().child('items');
	}

	getRef() {
		return firebaseApp.database().ref();
	}

	listenForItems(itemsRef) {
		itemsRef.on('value', (snap) => {
			
			var items = [];
			snap.forEach((child) => {
				items.push({
					title: child.val().title,
					_key: child.key
				});
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items)
			});
		});
	}

	componentDidMount() {
		this.listenForItems(this.itemsRef);
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar title="Seasons"/>

				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderItem.bind(this)}
					enableEmptySections={true}
					style={styles.listView}/>

			</View>
		)
	}

	_renderItem(item) {
		const onPress = () => {
			AlertIOS.alert(
				'Complete',
				null,
				[
					{text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
					{text: 'Cancel', onPress: (text) => console.log('Cancelled')}
				]
			);
		};

		return (
			<ListItem item={item} onPress={onPress} />	
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#F6F6F6',
	},
	separator: {
		height: 1,
		backgroundColor: '#CCCCCC',
	},
	text: {
		flex: 1,
	},
});


export default SeasonPage;
