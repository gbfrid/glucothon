import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSwitchNavigator } from 'react-navigation'
import { StyleSheet, Text, View, Button } from "react-native";



class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DashboardScreen
