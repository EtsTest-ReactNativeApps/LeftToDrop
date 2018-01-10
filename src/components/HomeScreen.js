import React from 'react';
import TableViewScreen from './TableViewScreen';

const HomeScreen = () => {
  return (
    <TableViewScreen
      destinations={[
        { text: 'Left To Drop', screen: 'Seasons' },
        { text: 'Previous Drops', screen: 'Seasons' },
        { text: 'Favorites', screen: 'Favorites' }
      ]}
    />
  );
};

export default HomeScreen;
