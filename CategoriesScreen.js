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
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		categories = ['all', 'jackets', 'shirts', 'top/sweaters', 'sweatshirts', 'pants', 't-shirts', 'hats', 'bags', 'accessories', 'skate'];

		this.state = {
			dataSource: ds.cloneWithRows(categories),
		};
	}

	render() {
		const { navigate } = this.props.navigation;
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

	_onPressRow(rowID: number) {
		const { navigate } = this.props.navigation;
		navigate(categories[rowID]);
	}

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight
        onPress = {this._onPressRow.bind(this, rowID)}
        underlayColor = 'whitesmoke'>
        <View style={styles.cell}>
          <Text style={styles.text}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
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
