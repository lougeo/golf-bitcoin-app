import React from "react";
import { ImageBackground, StyleSheet, View, Text, Button } from "react-native";

const SplashScreen = ({ navigation }) => {
    return (
        <View 
          style={styles.background}
        //   source={require("../assets/background.jpg")}
        >
            <Text >
                Fuck u bitch
            </Text>
            <Button
                title="CUNT"
                onPress={() => navigation.navigate("Profile")}
            />
        </View>
    )
}
// function SplashScreen(props) {
//     return (
//         <View 
//           style={styles.background}
//         //   source={require("../assets/background.jpg")}
//         >
//             <Text >
//                 Fuck u bitch
//             </Text>
//         </View>
//     );
// };

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