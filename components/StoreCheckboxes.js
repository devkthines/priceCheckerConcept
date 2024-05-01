// StoreCheckboxes.js
import React from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { stores } from '../constants/stores'; // Assuming you have a list of stores in a separate file

const StoreCheckboxes = ({ selectedStores, setSelectedStores }) => {
  const handleStoreCheckboxChange = (storeId) => {
    setSelectedStores((prevSelectedStores) =>
      prevSelectedStores.includes(storeId)
        ? prevSelectedStores.filter((id) => id !== storeId)
        : [...prevSelectedStores, storeId]
    );
  };

  return (
    <View>
      {stores.map((store) => (
        <View key={store.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            status={selectedStores.includes(store.id) ? 'checked' : 'unchecked'}
            onPress={() => handleStoreCheckboxChange(store.id)}
          />
          <Text>{store.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default StoreCheckboxes;