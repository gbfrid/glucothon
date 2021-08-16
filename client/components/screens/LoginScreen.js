import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { Box, Center, NativeBaseProvider, Button } from "native-base";

const LoginScreen = ({ navigation }) => {
  const iosClientId =
    "696943573998-jpljavotl70ntn5ht8hltgkf6aqqhd8u.apps.googleusercontent.com";
  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: iosClientId,
      });

      if (type === "success") {
        console.log("LoginScreen.js 17 | success, navigating to profile");
        navigation.navigate("GlucoThon", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button size="lg" title="Login with Google" onPress={signInAsync}>
        Log in with Google!
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
