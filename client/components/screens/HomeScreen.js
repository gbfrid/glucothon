import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home.js";
import Meal from "./Meal.js";
import History from "./History.js";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen(props) {
  const user = props.route.params.user;
  return (
    <Tab.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          tabBarIcon: () => <Ionicons name="ios-home" size={35} />,
          headerShown: false
        }}
      >
        {(props) => <Home {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="Meal"
        options={{
          tabBarIcon: () => <Ionicons name="fast-food" size={35} />,
          headerShown: false }}
      >
        {(props) => <Meal {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="History"
        options={{
          tabBarIcon: () => <Ionicons name="water" size={35} />,
          headerShown: false }}
      >
        {(props) => <History {...props} user={user} />}
      </Stack.Screen>
    </Tab.Navigator>
  );
}

export default HomeScreen;
