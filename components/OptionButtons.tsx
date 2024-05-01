import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface OptionButtonsProps {
  selectedOption: 'DSD' | 'Grocery' | null;
  setSelectedOption: (option: 'DSD' | 'Grocery' | null) => void;
}

const OptionButtons: React.FC<OptionButtonsProps> = ({ selectedOption, setSelectedOption }) => {
  const handleOptionPress = (option: 'DSD' | 'Grocery') => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <Button
        mode={selectedOption === 'DSD' ? 'contained' : 'outlined'}
        onPress={() => handleOptionPress('DSD')}
        style={styles.button}
      >
        DSD
      </Button>
      <Button
        mode={selectedOption === 'Grocery' ? 'contained' : 'outlined'}
        onPress={() => handleOptionPress('Grocery')}
        style={styles.button}
      >
        Grocery
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default OptionButtons;