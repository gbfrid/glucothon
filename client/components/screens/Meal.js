import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


function Meal(props) {
  console.log(props)
  return (
   <View>
     <Text>Hello There, {props.user.givenName}</Text>
    </View>
  );
}

export default Meal

