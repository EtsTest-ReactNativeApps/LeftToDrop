import { StyleSheet } from 'react-native';
import { defaults, defaultStyles } from './defaults';

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
  textDetail: {
    flex: 1,
    textAlign: 'right'
  },
  textDelete: {
    color: 'red',
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
