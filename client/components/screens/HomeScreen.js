import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home.js";
import Meal from "./Meal.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeScreen(props) {
  const user = props.route.params.user
  return (
    <Tab.Navigator initialRouteName="Home">
       {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Home',
        }} /> */}
      <Stack.Screen name="Home">
        {(props) => <Home {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Meal">
        {(props) => <Meal {...props} user={user} />}
      </Stack.Screen>
      {/* <Stack.Screen name="Meal" component={Meal} /> */}
    </Tab.Navigator>
  );
}

export default HomeScreen


  {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator> */}


