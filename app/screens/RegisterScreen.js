import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Button, TextInput } from "react-native";
import { AuthContext } from '../providers/AuthContext';



function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password_confirm, setPasswordConfirm] = React.useState('');

  const { register } = React.useContext(AuthContext);

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={password_confirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />
      <Button title="Submit" onPress={() => register({ email, password, password_confirm })} />
      <Button title="Return" onPress={() => navigation.navigate("SignIn")} />
    </SafeAreaView>
  );
}

export default RegisterScreen;