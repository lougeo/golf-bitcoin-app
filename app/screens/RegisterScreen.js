import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { AuthContext } from '../providers/AuthContext';



function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password_confirm, setPasswordConfirm] = React.useState('');

  const { register } = React.useContext(AuthContext);

  return (
    <View>
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
    </View>
  );
}

export default RegisterScreen;