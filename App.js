import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, Text, View, Button } from "react-native";
import Home from "./client/components/screens/Home.js";
import FoodItem from "./client/components/screens/FoodItem.js";
import store from "./client/store";
import LoginScreen from "./client/components/screens/LoginScreen.js";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import "firebase/firestore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, Box } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddHealthData from "./client/components/screens/AddHealthData.js";
import HomeScreen from "./client/components/screens/HomeScreen.js";
import { ThemeProvider } from "react-native-ios-kit";
import { AppRegistry } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="GlucoThon" component={HomeScreen} />
              <Stack.Screen name="FoodItem" component={FoodItem} />
              <Stack.Screen name="AddHealthData" component={AddHealthData} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </NativeBaseProvider>
    </Provider>
  );
}

AppRegistry.registerComponent("app", () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
