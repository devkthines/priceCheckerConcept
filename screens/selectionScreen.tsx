// screens/SelectionScreen.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import StoreCheckboxes from '../components/StoreCheckboxes';
import CompetitorCheckboxes from '../components/CompetitorCheckboxes';
import OptionButtons from '../components/OptionButtons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Selection: undefined;
  ScanningScreen: { selectedStores: string[]; selectedCompetitors: string[]; data: GroupedData };
};

type GroupedData = { [category: string]: ItemData[] };

interface ItemData {
  name: string;
  upc: string;
  description: string;
  packSize: string;
  retailPrice: number;
}

type SelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Selection'>;

const SelectionScreen = () => {
  const navigation = useNavigation<SelectionScreenNavigationProp>();
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<'DSD' | 'Grocery' | null>(null);

  const handleButtonPress = async () => {
    if (!selectedOption) return;
    const data = await fetchDataFromDatabase(selectedStores, selectedCompetitors, selectedOption);
    navigation.navigate('ScanningScreen', { selectedStores, selectedCompetitors, data });
  };

  return (
    <View>
      <StoreCheckboxes selectedStores={selectedStores} setSelectedStores={setSelectedStores} />
      <CompetitorCheckboxes selectedCompetitors={selectedCompetitors} setSelectedCompetitors={setSelectedCompetitors} />
      <OptionButtons selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Button onPress={handleButtonPress} disabled={!selectedOption}>
        Populate
      </Button>
    </View>
  );
};

const fetchDataFromDatabase = async (
  selectedStores: string[],
  selectedCompetitors: string[],
  selectedOption: 'DSD' | 'Grocery'
): Promise<GroupedData> => {
  const fetchedData: ItemData[] = [
    { name: 'Item 1', upc: '6972011060820', description: 'Item 1 description', packSize: '12 oz', retailPrice: 2.99 },
    { name: 'Item 2', upc: '234567890123', description: 'Item 2 description', packSize: '16 oz', retailPrice: 3.49 },
  ];
  const groupedData = groupDataByCategory(fetchedData);
  return groupedData;
};

const groupDataByCategory = (data: ItemData[]): GroupedData => {
  const groupedData: GroupedData = {};
  data.forEach((item) => {
    const category = getCategoryForItem(item);
    if (!groupedData[category]) {
      groupedData[category] = [];
    }
    groupedData[category].push(item);
  });
  return groupedData;
};

const getCategoryForItem = (item: ItemData): string => {
  return 'Condiments';
};

export default SelectionScreen;