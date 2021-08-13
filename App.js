import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { StyleSheet, Text, View, Button } from "react-native";
import Home from "./client/components/Home.js";
import store from "./client/store";
import LoadingScreen from "./client/components/screens/LoadingScreen.js";
import LoginScreen from "./client/components/screens/LoginScreen.js";
import DashboardScreen from "./client/components/screens/DashboardScreen.js";
import firebase from "firebase";
import { firebaseConfig } from './config'
// firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <Provider store={store}>
      {/* <AppNavigator /> */}
      <View style={styles.container}>
        <Home />
      </View>


    </Provider>
  );
}

// const appSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: LoadingScreen,
//   LoginScreen: LoginScreen,
//   DashboardScreen: DashboardScreen
// })

// const AppNavigator = createAppContainer(appSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
