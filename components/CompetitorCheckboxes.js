// CompetitorCheckboxes.js
import React from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { competitors } from '../constants/competitors'; // Assuming you have a list of competitors in a separate file

const CompetitorCheckboxes = ({ selectedCompetitors, setSelectedCompetitors }) => {
  const handleCompetitorCheckboxChange = (competitorId) => {
    setSelectedCompetitors((prevSelectedCompetitors) =>
      prevSelectedCompetitors.includes(competitorId)
        ? prevSelectedCompetitors.filter((id) => id !== competitorId)
        : [...prevSelectedCompetitors, competitorId]
    );
  };

  return (
    <View>
      {competitors.map((competitor) => (
        <View key={competitor.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            status={selectedCompetitors.includes(competitor.id) ? 'checked' : 'unchecked'}
            onPress={() => handleCompetitorCheckboxChange(competitor.id)}
          />
          <Text>{competitor.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CompetitorCheckboxes;