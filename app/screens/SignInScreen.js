import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { AuthContext } from "../../App"


function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}


// import AuthContext from "../../App"
// const SignInScreen = ({ navigation }) => {
//     const [username, setUsername] = React.useState('');
//     const [password, setPassword] = React.useState('');
  
//     const { signIn } = React.useContext(AuthContext);
  
//     return (
//       <View>
//         <TextInput
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//         />
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <Button title="Sign in" onPress={() => signIn({ username, password })} />
//       </View>
//     );
// }

export default SignInScreen;

// const styles = StyleSheet.create({
//     background: {
//         backgroundColor: "#F0EAD6",
//     },
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
// });