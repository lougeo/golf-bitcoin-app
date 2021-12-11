import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from "react-native";
import { AuthContext } from '../providers/AuthContext';


function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.resetBtn}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={() => signIn({ email, password })}>
        <Text style={styles.actionBtnText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.actionBtnText}>REGISTER</Text>
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

  inputView: {
    backgroundColor: "#9db802",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  textInput: {
    color: "white",
    flex: 1,
  },
 
  resetBtn: {
    height: 30,
    marginBottom: 30,
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

export default SignInScreen;