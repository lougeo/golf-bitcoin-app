import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Button, TextInput, Text } from "react-native";
import { AuthContext } from '../providers/AuthContext';


function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text>Signed in!</Text>
      <Button title="Courses" onPress={() => navigation.navigate("CourseList")} />
      <Button title="Sign out" onPress={signOut} />
    </SafeAreaView>
  );
}

export default HomeScreen;