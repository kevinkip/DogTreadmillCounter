// ViewLogScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewLogScreen = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const logs = items.map(item => JSON.parse(item[1]));
    setLogs(logs);
  };

  const exportData = async () => {
    try {
      const logsString = JSON.stringify(logs, null, 2);
      const path = RNFS.DocumentDirectoryPath + '/logs-export.json';

      await RNFS.writeFile(path, logsString, 'utf8');
      console.log('Data exported successfully. Path:', path);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Button title="Export Data" onPress={exportData} />
      {logs.map((log, index) => (
        <View key={index} style={styles.logItem}>
          <Text>Dog: {log.selectedDog}</Text>
          <Text>Date: {new Date(log.date).toLocaleString()}</Text>
          <Text>Miles: {log.miles}</Text>
          <Text>Calories: {log.calories}</Text>
          <Text>Duration: {log.duration}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
});

export default ViewLogScreen;
