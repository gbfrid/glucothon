import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, Text, View, Button } from "react-native";
import Home from "./client/components/screens/Home.js";
import FoodItem from './client/components/screens/FoodItem.js'
import store from "./client/store";
import LoginScreen from "./client/components/screens/LoginScreen.js";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import 'firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, Box } from 'native-base';


// async function testFirebase () {
//   const data = db.collection('users')
//   return data
// }



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: 'Hello There',
              headerLeft: () => {
                return null;
              },
            }} />
          <Stack.Screen name="FoodItem" component={FoodItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// const appSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: LoadingScreen,
//   LoginScreen: LoginScreen,
//   DashboardScreen: DashboardScreen,
//   Home: Home,
// });

// const AppNavigator = createAppContainer(appSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

