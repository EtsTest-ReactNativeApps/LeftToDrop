import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ratingBarStylesCreator as stylesCreator } from '../../styles';

class RatingBarView extends Component {
  render() {
    const { upvoteCount, downvoteCount } = this.props;
    const styles = stylesCreator(upvoteCount, downvoteCount);

    return (
      <View style={styles.containerView}>
        <View style={styles.upvoteView} />
        <View style={styles.downvoteView} />
      </View>
    );
  }
}

export default RatingBarView;
