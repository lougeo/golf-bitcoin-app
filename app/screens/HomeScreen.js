import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import { AuthContext } from '../providers/AuthContext';


function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome!</Text>

      <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("CourseList")}>
        <Text style={styles.actionBtnText}>COURSES</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  actionBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#025b0e",
  },

  actionBtnText: {
    color: "white",
  }
});

export default HomeScreen;