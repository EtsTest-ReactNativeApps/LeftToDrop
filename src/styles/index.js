import { Dimensions, StyleSheet } from 'react-native';

const defaults = {
  themeColor: 'red',
  contentBackgroundColor: 'white', // e.g. cell background color
  containerBackgroundColor: 'whitesmoke',
  titleFont: 'Futura',
  titleColor: 'white',
  titleStyle: 'italic',
  textFont: 'Courier New',
  textColor: 'black'
};

export const defaultNavigationOptions = {
  headerTitleStyle: {
    fontFamily: defaults.titleFont,
    fontSize: 25,
    fontStyle: defaults.titleStyle
  },
  headerStyle: {
    backgroundColor: defaults.themeColor
  },
  headerTintColor: defaults.titleColor,
  headerBackTitleStyle: {
    fontFamily: defaults.titleFont,
    fontSize: 18,
    fontStyle: defaults.titleStyle
  }
};

// Default styles theme
export const defaultStyles = StyleSheet.create({
  containerView: {
    backgroundColor: defaults.containerBackgroundColor,
    flex: 1
  },
  text: {
    color: defaults.textColor,
    fontFamily: defaults.textFont,
    fontSize: 20
  }
});

export const itemButtonStylesCreator = (
  color,
  marginLeft = 0,
  marginRight = 0
) => {
  return StyleSheet.create({
    button: {
      backgroundColor: color,
      borderRadius: 3,
      flex: 1,
      justifyContent: 'center',
      marginLeft: marginLeft,
      marginRight: marginRight
    },
    text: {
      color: defaults.titleColor,
      fontFamily: defaults.titleFont,
      fontStyle: defaults.titleStyle,
      fontSize: 20,
      textAlign: 'center'
    }
  });
};

export const tableViewScreenStyles = StyleSheet.create({
  cell: {
    alignItems: 'flex-start',
    backgroundColor: defaults.contentBackgroundColor,
    flex: 1,
    height: 50,
    justifyContent: 'center'
  },
  separator: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    height: 1
  },
  text: {
    marginLeft: 15,
    textAlign: 'left'
  }
});

export const itemScreenStyles = StyleSheet.create({
  itemNameText: {
    margin: 15,
    marginBottom: 0,
    textAlign: 'left',
    textAlignVertical: 'center'
  },

  imageView: {
    backgroundColor: defaults.contentBackgroundColor,
    borderRadius: 3,
    flex: 2,
    justifyContent: 'center',
    padding: 10,
    margin: 15,
    marginBottom: 5,
    overflow: 'hidden'
  },
  image: {
    height: '100%',
    resizeMode: 'contain'
  },

  bottomContainerView: {
    flex: 1,
    margin: 15,
    marginTop: 0
  },
  buttonContainerView: {
    flexDirection: 'row',
    height: 40
  },
  descriptionView: {
    backgroundColor: defaults.contentBackgroundColor,
    borderRadius: 3,
    flex: 1,
    marginTop: 5,
    padding: 5
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'justify'
  }
});

export const favoritesScreenStyles = StyleSheet.create({
  listView: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5
  },
  cell: {
    aspectRatio: 1,
    backgroundColor: defaults.contentBackgroundColor,
    borderRadius: 3,
    justifyContent: 'center',
    margin: 5,
    overflow: 'hidden',
    width: Dimensions.get('window').width / 3 - 5 * 2.7
  },
  cellImage: {
    height: 100,
    resizeMode: 'contain'
  }
});
