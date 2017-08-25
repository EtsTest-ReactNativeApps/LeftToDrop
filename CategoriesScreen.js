import React from 'react';
import {
	Button,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class CategoriesScreen extends React.Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		categories = ['All', 'Jackets', 'Shirts', 'Top/Sweaters', 'Sweatshirts', 'Pants', 'T-shirts', 'Hats', 'Bags', 'Accessories', 'Skate'];

		this.state = {
			dataSource: ds.cloneWithRows(categories),
		};
	}

	render() {
		return(
			<ListView style={styles.container}
				dataSource={this.state.dataSource}
				renderRow={this._renderRow.bind(this)}
				renderSeparator={(sectionID, rowID) =>
					<View
						key={rowID}
						style={styles.separator}
					/>
				}
			/>
		);
	}

	_onPressRow(rowID) {
		const { navigate } = this.props.navigation;
		navigate(
			'Items',
			{
				category: categories[rowID],
				season: this.props.navigation.state.params.season
			}
		);
	}

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress = {this._onPressRow.bind(this, rowID)}
        underlayColor = 'whitesmoke'>
        <View style={styles.cell}>
          <Text style={styles.text}>
            {rowData.toLowerCase()}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.season,
	});
}

const styles = StyleSheet.create({
	cell: {
		alignItems: 'flex-start',
		flex: 1,
		height: 50,
		justifyContent: 'center'
	},
	container: {
		backgroundColor: 'white'
	},
	separator: {
		backgroundColor: '#EEEEEE',
		flex: 1,
		height: 1
	},
	text: {
		color: 'black',
		fontFamily: 'Courier New',
		fontSize: 15,
		marginLeft: 15,
		textAlign: 'left'
	},
})
