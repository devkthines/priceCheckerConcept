import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoCameraDeviceError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No camera device found on this device.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default NoCameraDeviceError;