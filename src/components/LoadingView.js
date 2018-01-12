import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

class LoadingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frame: 0,
      text: ['Loading', ' Loading.', '  Loading..', '   Loading...']
    };

    setInterval(() => {
      this.setState(prevState => {
        return { frame: (prevState.frame + 1) % 4 };
      });
    }, 500);
  }

  render() {
    const { text, frame } = this.state;
    let label = text[frame % 4];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
      </View>
    );
  }
}

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontFamily: 'Courier New',
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center'
  }
});
