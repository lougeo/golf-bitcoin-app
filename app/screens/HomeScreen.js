import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import { mainStyles } from '../styles/mainStyles';
import { secondaryColor } from "../styles/constants";


function HomeScreen({ navigation }) {
  
  return (
    <SafeAreaView style={mainStyles.containerCenter}>
      <Text>Welcome!</Text>

      <TouchableOpacity style={mainStyles.actionBtn} onPress={() => navigation.navigate("CourseList")}>
        <Text style={mainStyles.actionBtnText}>COURSES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mainActionBtn} onPress={() => navigation.navigate("RoundCreate")}>
        <Text style={mainStyles.actionBtnText}>START ROUND</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  mainActionBtn: {
    ...mainStyles.actionBtn,
    height: 100,
    backgroundColor: secondaryColor,
  },

});

export default HomeScreen;