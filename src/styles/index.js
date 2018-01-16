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
    backgroundColor: defaults.containerBackgroundColor, //'#EEEEEE',
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

const cellWidth = () => {
  return (grid.windowWidth - 2 * grid.margin) / 3 - 2 * grid.cellMargin;
};

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
    borderRadius: 3,
    justifyContent: 'center',
    margin: grid.cellMargin,
    overflow: 'hidden',
    width: cellWidth()
  },
  cellImage: {
    height: 100,
    resizeMode: 'contain'
  }
});
