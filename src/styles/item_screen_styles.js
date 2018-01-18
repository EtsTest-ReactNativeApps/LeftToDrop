import { StyleSheet } from 'react-native';
import { defaults } from './defaults';

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
