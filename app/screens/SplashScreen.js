import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, Text, Button } from "react-native";

function SplashScreen() {
  return (
    <SafeAreaView>
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#F0EAD6",
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});