import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const HomeScreen = ({ navigation }) => {
  const [selectedDog, setSelectedDog] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("date");
  const [miles, setMiles] = useState("1");
  const [calories, setCalories] = useState("1");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");

  const dogImages = {
    Moose: require("./assets/moosesmile.jpg"), // Make sure to replace with your actual image paths
    Gus: require("./assets/gussmile.jpg"),
  };

  const selectDog = (dogName) => {
    setSelectedDog(dogName);
  };

  const logData = async () => {
    const duration = `${hours} Hours, ${minutes} Minutes`;
    try {
      const logEntry = {
        selectedDog,
        date: date.toISOString(),
        miles: parseFloat(miles),
        calories: parseInt(calories, 10),
        duration,
      };
      console.log("Here's the log entry: ", logEntry);
      const logKey = `log_${selectedDog}_${Date.now()}`;
      await AsyncStorage.setItem(logKey, JSON.stringify(logEntry));
      Alert.alert("Data logged successfully");
    } catch (error) {
      console.log(error); // Use console.log to see the detailed error
      Alert.alert("Failed to log data");
    }
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("All data cleared!");
    } catch (error) {
      Alert.alert("Failed to clear data");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      if (pickerMode === "date") {
        setPickerMode("time");
        setShowDatePicker(true);
      } else {
        setPickerMode("date");
        setShowDatePicker(false);
      }
    } else {
      setPickerMode("date");
      setShowDatePicker(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Dog Treadmill Session</Text>
      <View style={styles.flexContainer}>
        <Pressable
          style={styles.chooseDateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Choose Date</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={pickerMode}
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}
        <Text style={styles.dateText}>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </Text>
        <View style={styles.dogSelectionContainer}>
          {Object.entries(dogImages).map(([dogName, imagePath]) => (
            <Pressable
              key={dogName}
              onPress={() => selectDog(dogName)}
              style={[
                styles.dogImageContainer,
                { opacity: selectedDog === dogName ? 1 : 0.5 },
              ]}
            >
              <Image source={imagePath} style={styles.dogImage} />
            </Pressable>
          ))}
        </View>
        <Text style={styles.selectedDogName}>{selectedDog}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Miles Ran:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMiles}
            value={miles}
            keyboardType="numeric"
            placeholder="Enter miles"
          />
          <Text style={styles.label}>Duration:</Text>
          <View style={styles.durationContainer}>
            <Picker
              selectedValue={hours}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setHours(itemValue)}
            >
              {[...Array(24).keys()].map((hour) => (
                <Picker.Item
                  label={`${hour} hr`}
                  value={`${hour}`}
                  key={hour}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={minutes}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
            >
              {[...Array(60).keys()].map((minute) => (
                <Picker.Item
                  label={`${minute} min`}
                  value={`${minute}`}
                  key={minute}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Calories Burned:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCalories}
            value={calories}
            keyboardType="numeric"
            placeholder="Enter calories"
          />
        </View>
        <Pressable style={styles.logButton} onPress={logData}>
          <Text style={styles.buttonText}>Log</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.viewLogsButton}
        onPress={() => navigation.navigate("ViewLogs")}
      >
        <Text style={styles.buttonText}>View Logged Data</Text>
      </Pressable>

      {/* <Pressable
        style={[styles.logButton, { marginTop: 10 }]} // Reuse logButton styles with additional top margin
        onPress={clearAsyncStorage}
      >
        <Text style={styles.buttonText}>Clear Data</Text>
      </Pressable> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  flexContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  dogSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  dogImageContainer: {
    width: 180, // Increased size for easier touch interaction
    height: 180, // Increased size for easier touch interaction
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  dogImage: {
    width: "100%",
    height: "100%",
  },
  selectedDogName: {
    fontSize: 24, // Increased font size for readability
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50, // Increased height for easier touch interaction
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  picker: {
    flex: 1,
  },
  dateText: {
    textAlign: "center",
    marginBottom: 20,
  },
  chooseDateButton: {
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#007AFF",
    width: "80%",
  },
  logButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  viewLogsButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default HomeScreen;
