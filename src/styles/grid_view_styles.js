import { Dimensions, StyleSheet } from 'react-native';
import { defaults } from './defaults';

// Dynamically calculate cellWidth
const grid = {
  windowWidth: Dimensions.get('window').width,
  margin: 5,
  cellMargin: 5
};

const cellWidth =
  (grid.windowWidth - 2 * grid.margin) / 3 - 2 * grid.cellMargin;

export const gridViewStyles = StyleSheet.create({
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
