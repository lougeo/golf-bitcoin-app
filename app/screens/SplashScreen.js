import React from "react";
import { ImageBackground, StyleSheet, View, Text, Button } from "react-native";

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
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