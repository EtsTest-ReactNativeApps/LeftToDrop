import React from 'react';
import TableViewScreen from './TableViewScreen';

const HomeScreen = () => {
  return (
    <TableViewScreen
      destinations={[
        { text: 'Season 1', screen: 'Categories' },
        { text: 'Season 2', screen: 'Categories' },
        { text: 'Season 3', screen: 'Categories' }
      ]}
    />
  );
};

export default HomeScreen;
