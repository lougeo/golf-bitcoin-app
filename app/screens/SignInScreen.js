import React from "react";
import { ImageBackground, StyleSheet, View, Text, Button } from "react-native";

const SignInScreen = ({ navigation }) => {
    return (
        <View 
          style={styles.background}
        //   source={require("../assets/background.jpg")}
        >
            <Text >
                SIGN IN
            </Text>
            <Button
                title="CUNT"
                onPress={() => navigation.navigate("Profile")}
            />
        </View>
    )
}

export default SignInScreen;

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