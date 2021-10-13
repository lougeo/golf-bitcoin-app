import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";

const ProfileScreen = ({ navigation }) => {
    return (
        <View 
          style={styles.background}
        //   source={require("../assets/background.jpg")}
        >
            <Text >
                PROFILE SCREEN BITCH
            </Text>
        </View>
    )
}

export default ProfileScreen;

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