import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import * as GoogleAuthentication from 'expo-google-app-auth';
import firebase from 'firebase';

const LoginScreen = () => {

  const client_key = '696943573998-jpljavotl70ntn5ht8hltgkf6aqqhd8u.apps.googleusercontent.com'
  const signInWithGoogle = () =>
    GoogleAuthentication.logInAsync({
        iosStandaloneAppClientId: client_key,
        scopes: ['profile', 'email']
    })
        .then((logInResult) => {
            if (logInResult.type === 'success') {
                const { idToken, accessToken } = logInResult;
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken,
                    accessToken
                );

                return firebase.auth().signInWithCredential(credential);
                // Successful sign in is handled by firebase.auth().onAuthStateChanged
            }
            return Promise.reject(); // Or handle user cancelation separatedly
        })
        .catch((error) => {
            console.log(error)
        });


return (
<View>
  <Button
  title="Sign In"
  onPress={() => {signInWithGoogle()}}
  >
  </Button>
</View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen
