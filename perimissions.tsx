import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PermissionScreen = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This app needs camera permissions to function.</Text>
      <Button title="Request Camera Permissions" onPress={onPress} />
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
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PermissionScreen;