import { StyleSheet } from 'react-native';

export const defaultNavigationOptions = {
  headerTitleStyle: {
    fontFamily: 'Futura',
    fontSize: 25,
    fontStyle: 'italic'
  },
  headerStyle: {
    backgroundColor: 'red'
  },
  headerTintColor: 'white',
  headerBackTitleStyle: {
    fontFamily: 'Futura',
    fontSize: 18,
    fontStyle: 'italic'
  }
};

export const itemButtonStyleCreator = (
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
      color: 'white',
      fontFamily: 'Futura',
      fontStyle: 'italic',
      fontSize: 20,
      textAlign: 'center'
    }
  });
};

export const itemScreenStyle = StyleSheet.create({
  caption: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 15,
    marginTop: 0
  },
  chat: {
    backgroundColor: 'lightgray',
    borderRadius: 3,
    flex: 1,
    marginTop: 5
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  image: {
    height: '100%',
    resizeMode: 'contain'
  },
  imageView: {
    backgroundColor: 'white',
    borderRadius: 3,
    flex: 2,
    justifyContent: 'center',
    padding: 10,
    margin: 15,
    marginBottom: 5,
    overflow: 'hidden'
  },
  itemName: {
    color: 'black',
    fontFamily: 'Courier New',
    fontSize: 15,
    margin: 15,
    marginBottom: 0,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 35
  }
});
