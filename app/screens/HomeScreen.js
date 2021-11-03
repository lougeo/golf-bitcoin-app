import React from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";
import { AuthContext } from '../providers/AuthContext';


function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

export default HomeScreen;