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

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
