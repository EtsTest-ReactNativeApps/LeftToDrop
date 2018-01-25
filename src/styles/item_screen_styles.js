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
    paddingHorizontal: defaults.marginHorizontal
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
    margin: defaults.marginHorizontal,
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
    //    height: 50,
    paddingHorizontal: defaults.marginHorizontal,
    paddingVertical: 5
  },
  descriptionView: {
    backgroundColor: defaults.contentBackgroundColor,
    //flex: 1,
    minHeight: 100,
    paddingHorizontal: defaults.marginHorizontal,
    paddingVertical: 10
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'justify'
  }
});

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
