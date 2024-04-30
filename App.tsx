/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useCameraPermission, useCameraDevice} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import PermissionScreen from './perimissions.tsx';
import {useCodeScanner} from 'react-native-vision-camera';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {hasPermission, requestPermission} = useCameraPermission();
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const device = useCameraDevice('back');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        const latestCode = codes[codes.length - 1];
        const codeValue = latestCode.value;
        if (codeValue !== undefined) {
          setCurrentCode(codeValue);
          console.log(`Scanned code: ${codeValue}`);
          Alert.alert('Scanned!', `Scanned code: ${codeValue}`);
        }
      }
    },
  });
  if (!hasPermission) {
    return <PermissionScreen onPress={requestPermission} />;
  } else if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No camera device found on this device.</Text>
      </View>
    );
  }

  return (
    <Camera
      style={styles.camera}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 300,
    height: 300,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default App;
