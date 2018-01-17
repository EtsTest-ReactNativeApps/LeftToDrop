import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

class RatingBarView extends Component {
  render() {
    const { upvoteCount, downvoteCount } = this.props;
    const styles = ratingBarStylesCreator(upvoteCount, downvoteCount);

    return (
      <View style={styles.containerView}>
        <View style={styles.upvoteView} />
        <View style={styles.downvoteView} />
      </View>
    );
  }
}

export default RatingBarView;

export const ratingBarStylesCreator = (upvoteCount, downvoteCount) => {
  return StyleSheet.create({
    containerView: {
      flexDirection: 'row',
      height: 5
    },
    upvoteView: {
      backgroundColor: 'red',
      flex: upvoteCount,
      height: '100%'
    },
    downvoteView: {
      backgroundColor: 'blue',
      flex: downvoteCount,
      height: '100%'
    }
  });
};
