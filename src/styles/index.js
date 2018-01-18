import { Dimensions, StyleSheet } from 'react-native';

const defaults = {
  themeColor: 'red',
  contentBackgroundColor: 'white', // e.g. cell background color
  containerBackgroundColor: 'whitesmoke',
  titleFont: 'Futura',
  titleColor: 'white',
  titleStyle: 'italic',
  textFont: 'Courier New',
  textColor: 'black',
  fontSize: 20,
  cellHeight: 50,
  separatorColor: 'lightgray'
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
    //backgroundColor: defaults.containerBackgroundColor,
    flex: 1
  },
  separator: {
    backgroundColor: defaults.separatorColor,
    height: StyleSheet.hairlineWidth
  },
  text: {
    color: defaults.textColor,
    fontFamily: defaults.textFont,
    fontSize: defaults.fontSize
  }
});

export const listViewStyles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: defaults.contentBackgroundColor,
    borderColor: defaults.separatorColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    flexDirection: 'row',
    height: defaults.cellHeight,
    justifyContent: 'flex-start',
    paddingHorizontal: 15
  },
  imageView: {
    aspectRatio: 1,
    backgroundColor: defaults.contentBackgroundColor,
    borderColor: defaults.separatorColor,
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden',
    height: '90%'
  },
  image: {
    height: '100%',
    resizeMode: 'contain'
  },
  text: {
    flex: 1,
    textAlign: 'left'
  },
  sectionHeader: {
    borderColor: defaults.separatorColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: defaults.cellHeight * 4 / 5
  },
  spacer: {
    borderColor: defaults.separatorColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: defaults.cellHeight * 3 / 5
  }
});

export const itemScreenStyles = StyleSheet.create({
  itemNameContainerView: {
    position: 'absolute',
    width: '100%'
  },
  itemNameView: {
    backgroundColor: defaults.contentBackgroundColor,
    height: defaults.cellHeight,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  itemNameText: {
    textAlign: 'left'
  },
  scrollView: {
    marginTop: defaults.cellHeight
  },
  imageView: {
    aspectRatio: 1,
    backgroundColor: defaults.contentBackgroundColor,
    borderColor: defaults.separatorColor,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 2,
    justifyContent: 'center',
    padding: 10,
    margin: 15,
    overflow: 'hidden',
    width: '100%'
  },
  image: {
    height: '100%',
    resizeMode: 'contain'
  },
  bottomContainerView: {
    flex: 1
  },
  buttonContainerView: {
    backgroundColor: defaults.contentBackgroundColor,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  descriptionView: {
    backgroundColor: defaults.contentBackgroundColor,
    //flex: 1,
    minHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'justify'
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

/*
  Cell width calculation:
  ,-------- window.width --------,
  | ,--- window.width - 2M ----, |
  | |                          | |
  | |            ,-------------+-+- (window.width - 2M) / 3
  | |        ,---'----,        | |
  | |        |   ,----|--------+-+- (window.width - 2M) / 3 - 2m
  | |        | ,-'--, |        | |
  | |        | |    | |        | |
       ____     ____     ____
  |M|m|cell|m|m|cell|m|m|cell|m|M|
  | | |____|   |____|   |____| | |
  | '--------------------------' |
  '------------------------------'

  M: listViewMargin
  m: cellMargin

  window.width = M + m + cell.width + 2m + cell.width + 2m + cell.width + m + M
  window.width = 2M + 6m + 3cell.width
  window.width - 2M = 3cell.width + 6m
  (window.width - 2M) / 3 = cell.width + 2m
  cell.width = (window.width - 2M) / 3 - 2m

  if(M == m)
    cell.width = (window.width-8m)/3
*/

// Dynamically calculate cellWidth
const grid = {
  windowWidth: Dimensions.get('window').width,
  margin: 5,
  cellMargin: 5
};

const cellWidth =
  (grid.windowWidth - 2 * grid.margin) / 3 - 2 * grid.cellMargin;

export const favoritesScreenStyles = StyleSheet.create({
  listView: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: grid.margin
  },
  cell: {
    aspectRatio: 1,
    backgroundColor: defaults.contentBackgroundColor,
    borderColor: defaults.separatorColor,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    margin: grid.cellMargin,
    overflow: 'hidden',
    width: cellWidth
  },
  cellImage: {
    height: 100,
    resizeMode: 'contain'
  }
});

export const settingsScreenStyles = StyleSheet.create({
  valueStyle: {
    flex: 1,
    textAlign: 'right'
  },
  deleteLabel: {
    color: 'red'
  }
});
