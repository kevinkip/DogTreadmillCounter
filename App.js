import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ViewLogScreen from './ViewLogScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Treadmill Log'}} />
        <Stack.Screen name="ViewLogs" component={ViewLogScreen} options={{ title: 'View Logs' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
