import React, { Component } from 'react';
import {
  Button,
  Image,
  ListView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import EmptyView from './EmptyView';
import LoadingView from './LoadingView';
import { defaultStyles, favoritesScreenStyles as styles } from '../styles';

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
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows(this.props.favoriteItems || []);

    if (dataSource.getRowCount() == 0) {
      return <EmptyView message="No favorited items." />;
    } else {
      return (
        <View style={defaultStyles.containerView}>
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

export default connect(mapStateToProps)(FavoritesScreen);
