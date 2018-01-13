import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import GridView from 'react-native-gridview';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import EmptyView from './EmptyView';
import LoadingView from './LoadingView';
import { fetchFavoriteItems } from '../actions/fetch_favorites_action';

class FavoritesScreen extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows([])
    };
  }

  componentDidMount() {
    this.props.fetchFavoriteItems('krlargo');
  }

  onPressCell(item, cellID) {
    const { navigate } = this.props.navigation;
    navigate('Item', { id: item.id });
  }

  renderCell(item, _, cellID) {
    return (
      <View style={styles.cell}>
        <TouchableOpacity onPress={this.onPressCell.bind(this, item, cellID)}>
          <Image style={styles.cellImage} source={{ uri: item.image }} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { isLoading } = this.state;

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.favoriteItems || []);

    if (isLoading) {
      return <LoadingScreen />;
    }

    if (dataSource.getRowCount() == 0) {
      return <EmptyView message="No favorited items." />;
    } else {
      return (
        <View style={styles.container}>
          <ListView
            contentContainerStyle={styles.listView}
            dataSource={dataSource}
            renderRow={this.renderCell.bind(this)}
          />
        </View>
      );
    }
  }
}

mapStateToProps = ({ favoriteItems }) => {
  if (favoriteItems) {
    return {
      favoriteItems: favoriteItems.map(item => {
        const id = Object.keys(item)[0];
        const value = item[id];
        const name = value['name'];
        const image = value['image'];
        return { id, name, image };
      })
    };
  } else {
    return {
      favoriteItems: []
    };
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchFavoriteItems }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);

const styles = StyleSheet.create({
  cell: {
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 3,
    justifyContent: 'center',
    margin: 5,
    overflow: 'hidden',
    width: Dimensions.get('window').width / 3 - 5 * 2.7
  },
  cellImage: {
    height: 100,
    resizeMode: 'contain'
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    flex: 1
  },
  listView: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5
  },
  text: {
    color: 'black',
    fontFamily: 'Courier New',
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  view: {
    backgroundColor: 'white',
    flex: 1
  }
});
