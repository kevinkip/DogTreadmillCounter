import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const LoginScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['dodgerblue', 'deepskyblue', 'skyblue']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.centeredView}
        >
          <View style={styles.loginForm}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('./assets/moose.jpg')} // Adjust with your image path
                style={styles.logo}
              />
              <LinearGradient
                // Colors for the vignette effect; adjust as needed
                colors={['transparent', 'rgba(0,0,0,0.2)', 'transparent']}
                start={{x: 0.5, y: 0.0}}
                end={{x: 0.5, y: 1.0}}
                style={styles.vignette}
              />
            </View>
            <TouchableOpacity 
              onPress={handleLogin} 
              style={styles.roundButton}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    width: '70%',
    height: '70%',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: {height: 2, width: 0},
  },
  logoContainer: {
    width: width * 0.6,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 15, // Apply rounded edges to the container
    overflow: 'hidden', // Ensure the vignette doesn't exceed this container
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  vignette: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  roundButton: {
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
