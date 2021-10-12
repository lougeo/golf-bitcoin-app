import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";

function WelcomeScreen(props) {
    return (
        <View 
          style={styles.background}
        //   source={require("../assets/background.jpg")}
        >
            <Text >
                Fuck u bitch
            </Text>
        </View>
    );
};

export default WelcomeScreen;

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