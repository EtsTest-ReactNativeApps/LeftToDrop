import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import TableViewScreen from './TableViewScreen';
import EmptyView from '../subcomponents/EmptyView';

import { fetchMetadata, fetchUser } from '../../actions';
import { defaultStyles } from '../../styles';

class HomeScreen extends Component {
  // Parent Component owns the back button
  static navigationOptions = state => {
    return {
      headerBackTitle: 'Back',
      headerRight: (() => {
        const { navigation } = state;
        let user;
        if (navigation) {
          if (navigation.state) {
            if (navigation.state.params) {
              user = navigation.state.params.user;
            }
          }
        }

        // undefined user = user is still loading
        if (user != undefined) {
          if (_.isEmpty(user)) {
            // empty user = no user to load
            var label = 'Login';
            var onPress = () => navigation.navigate('Login');
          } else {
            // otherwise, user is loaded
            var label = 'Logout';
            var onPress = () => console.log('LOGOUT');
          }

          return (
            <TouchableHighlight
              style={{ margin: 20 }}
              onPress={onPress}
              underlayColor="red"
            >
              <Text style={defaultStyles.titleText}>{label}</Text>
            </TouchableHighlight>
          );
        }
      })()
    };
  };

  componentWillMount() {
    const { fetchMetadata, fetchUser } = this.props;
    fetchMetadata();
    fetchUser('krlargo');
  }

  componentWillReceiveProps(newProps) {
    const { user } = newProps;
    if (user !== this.props.user) {
      this.props.navigation.setParams({ user });
    }
  }

  /*componentDidMount() {
    const { user } = this.props;
    this.props.navigation.setParams({ user });
  }*/

  render() {
    const { metadata, navigation } = this.props;
    // ID is passed to TableViewScreen's cellData, then passed to CallingScreen from there
    const currentSeasonID = metadata ? metadata.currentSeasonID : null;
    return (
      <TableViewScreen
        staticCellData={[
          {
            id: currentSeasonID,
            label: 'Left To Drop',
            nextScreen: 'Categories'
          },
          {
            id: currentSeasonID,
            label: 'Previous Drops',
            nextScreen: 'Categories'
          },
          { label: 'Seasons', nextScreen: 'Seasons' },
          { label: 'Favorites', nextScreen: 'Favorites' },
          { label: 'Settings', nextScreen: 'Settings' }
        ]}
        navigation={navigation}
      />
    );
  }
}

const mapStateToProps = ({ metadata, user }, ownProps) => {
  return { metadata, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchMetadata,
      fetchUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
