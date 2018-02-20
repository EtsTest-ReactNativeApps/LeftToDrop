import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import TableViewScreen from './TableViewScreen';
import EmptyView from '../subcomponents/EmptyView';
import {
  fetchMetadata,
  listenForAuthStateChange,
  firebaseAnonymousLogin,
  firebaseLogout
} from '../../actions';
import { defaultStyles } from '../../styles';

class HomeScreen extends Component {
  // Parent Component owns the back button
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: 'Back',
      headerRight: (() => {
        const { params } = navigation.state;
        const user = params ? params.user : null;

        // undefined user = user is still loading
        //if (_.isEmpty(user)) {
        if (!user) return null; // Still loading user

        if (user.auth.isAnonymous) {
          // empty user = no user to load
          var label = 'Login';
          var onPress = () => navigation.navigate('Login');
        } else if (!user.auth.isAnonymous) {
          // otherwise, user is loaded
          var label = 'Logout';
          var onPress = () => navigation.state.params.firebaseLogout();
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
        //}
      })()
    };
  };

  componentWillMount() {
    const {
      fetchMetadata,
      listenForAuthStateChange,
      firebaseLogout
    } = this.props;
    fetchMetadata();
    listenForAuthStateChange();
    this.props.navigation.setParams({ firebaseLogout });
  }

  componentWillReceiveProps(newProps) {
    const { user } = newProps;
    if (user !== this.props.user) {
      this.props.navigation.setParams({ user });
    }
  }

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
          /*{ label: 'Seasons', nextScreen: 'Seasons' },*/
          {
            label: "This Week's Drop",
            nextScreen: 'Current'
          },
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
      listenForAuthStateChange,
      firebaseLogout
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
