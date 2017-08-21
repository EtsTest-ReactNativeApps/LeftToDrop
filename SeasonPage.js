'use strict'

import React, {
	Component
} from 'react';
import {
	ListView,
	StyleSheet,
	Text,
	View
} from 'react-native';

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

var TEST_DATA_2 = ['FW16','SS17','FW17', 'SS18']

const firebaseConfig = {
	apiKey: "AIzaSyA9QocrVseq9zvO_RI64HGDDf-HLuQYeXw",
	authDomain: "left-to-drop-9f551.firebaseapp.com",
	databaseURL: "https://left-to-drop-9f551.firebaseio.com",
	storageBucket: "left-to-drop-9f551.appspot.com"
};
//const firebaseApp = firebase.initializeApp(firebaseConfig);

class SeasonPage extends Component {
	constructor() {
		super();
		
		const ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(TEST_DATA_2)
		};
	}

	render() {
		return (
			<ListView
				dataSource = {this.state.dataSource}
				renderRow={(rowData) => <Text>{rowData}</Text>}
			/>
		);
	}
}



export default SeasonPage;
