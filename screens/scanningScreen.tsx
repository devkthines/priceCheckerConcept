// screens/ScanningScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Modal,TextInput } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useCameraPermission, useCameraDevice, useCodeScanner, CodeScanner, Code } from 'react-native-vision-camera';
import PermissionScreen from '../perimissions.tsx';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Camera } from 'react-native-vision-camera';

type RootStackParamList = {
  Selection: undefined;
  ScanningScreen: { selectedStores: string[]; selectedCompetitors: string[]; data: GroupedData };
};

type ScanningScreenRouteProp = RouteProp<RootStackParamList, 'ScanningScreen'>;

type GroupedData = { [category: string]: ItemData[] };

interface ItemData {
  name: string;
  upc: string;
  description: string;
  packSize: string;
  retailPrice: number;
}

type ScanningScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScanningScreen'>;

const ScanningScreen = () => {
  const navigation = useNavigation<ScanningScreenNavigationProp>();
  const route = useRoute<ScanningScreenRouteProp>();
  const { data, selectedStores, selectedCompetitors } = route.params;
  const [scannedBarcodes, setScannedBarcodes] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updatedPrice, setUpdatedPrice] = useState<number | null>(null);
  const [scannedItem, setScannedItem] = useState<ItemData | null>(null);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes: Code[]) => {
      if (codes.length > 0) {
        const latestCode = codes[codes.length - 1];
        const codeValue = latestCode.value;
        if (codeValue !== undefined) {
          setScannedBarcodes(codeValue);
          const allItems = Object.values(data).flat();
          const foundItem = allItems.find((item) => item.upc === codeValue);
          if (foundItem) {
            setScannedItem(foundItem);
            Alert.alert(
              'Scanned!',
              `Scanned code: ${codeValue}\nName: ${foundItem.name}\nPrice: ${foundItem.retailPrice}`,
              [
                {
                  text: 'Update Price',
                  onPress: () => setModalVisible(true),
                },
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ]
            );
          } else {
            Alert.alert('Scanned!', `Scanned code: ${codeValue}\nUPC not found in the list`);
          }
        }
      }
    },
  });

  const handleExit = () => {
    navigation.goBack();
  };

  const handleBackToSelection = () => {
    navigation.navigate('Selection');
  };

  const handlePriceUpdate = () => {
    if (scannedItem && updatedPrice !== null) {
      // Update the price in the database or state
      console.log(`Updating price for ${scannedItem.name} to ${updatedPrice}`);
      setModalVisible(false);
      setUpdatedPrice(null);
      setScannedItem(null);
      Alert.alert('Price Updated', 'The database has been updated.');
    }
  };

  if (!hasPermission) {
    return <PermissionScreen onPress={requestPermission} />;
  } else if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No camera device found on this device.</Text>
      </View>
    );
  }

  const renderCategory = (category: string) => (
    <View key={category}>
      <Text style={{ fontWeight: 'bold' }}>{category}</Text>
      <FlatList
        data={data[category]}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>UPC: {item.upc}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Pack Size: {item.packSize}</Text>
            <Text>Retail Price: {item.retailPrice}</Text>
          </View>
        )}
        keyExtractor={(item) => item.upc}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Camera style={styles.cameraPreview} device={device} isActive={true} codeScanner={codeScanner} />
      {Object.keys(data).map((category) => renderCategory(category))}
      <Button onPress={handleExit}>Exit</Button>
      <Button onPress={handleBackToSelection}>Back to Selection</Button>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {scannedItem && (
              <>
                <Text>Name: {scannedItem.name}</Text>
                <Text>UPC: {scannedItem.upc}</Text>
                <Text>Price: {scannedItem.retailPrice}</Text>
                <Text>Update Price?</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => setUpdatedPrice(parseFloat(text))}
                  value={updatedPrice?.toString() || ''}
                />
                <Button onPress={handlePriceUpdate}>Update</Button>
                <Button onPress={() => setModalVisible(false)}>Cancel</Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraPreview: {
    height: 100,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemList: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
});

export default ScanningScreen;