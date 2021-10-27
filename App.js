import React from 'react';
import { View, Button, TextInput, Text, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';

// import RootStackScreen from './app/screens/RootStackNavigator';
// import ProfileScreen from './app/screens/ProfileScreen';
// import SignInScreen from './app/screens/SignInScreen';


const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();
const ACTIONS = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

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
      <Button title="Sign in" onPress={() => signIn({ email, password })} />
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}

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

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case ACTIONS.RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case ACTIONS.SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case ACTIONS.SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: ACTIONS.RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
    // NOTE: Empty array here means that it only runs on mount, because it's not listening for anything.
  }, []);
  
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(data.email);
        console.log(data.password);
        fetch('http://192.168.139.220:8000/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        })
          .then(response => response.json())
          .then(json => {
            if ("token" in json) {
              console.log("Success:", json);
              try {
                SecureStore.setItemAsync('userToken', json.token);
              } catch (e) {
                console.log("FAILED TO SET USERTOKEN")
              }
              dispatch({ type: ACTIONS.SIGN_IN, token: json.token });
            } else {
              // Invalid email/password. Raise form error.
              console.log("Invalid", json);
              Alert.alert(
                "Bad Data",
                "Fuck u bitch",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }
          })
          .catch((error) => {
            // Network error, server off or similar.
            console.error("Error:", error);
          });
      },
      signOut: async () => {
        let userToken;

        try {
          userToken = await SecureStore.getItemAsync('userToken');
        } catch (e) {
          console.log("FAILED TO GET USERTOKEN")
        }
        fetch('http://192.168.139.220:8000/api/auth/logout/', {
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + userToken
          }
        })
          .then(response => {
            if (response.ok) {
              try {
                SecureStore.deleteItemAsync('userToken');
              } catch (e) {
                console.log("FAILED TO DELETE USERTOKEN")
              }
              dispatch({ type: ACTIONS.SIGN_OUT })
            } else {
              console.log("Response error: ", response);
            }
          })
          .catch((error) => {
            // Network error, server off or similar.
            console.error("Error:", error);
          });
      },
      register: async (data) => {
        console.log(data.email);
        console.log(data.password);
        console.log(data.password_confirm);
        fetch('http://192.168.139.220:8000/api/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            password_confirm: data.password_confirm,
          })
        })
          .then(response => response.json())
          .then(json => {
            if ("token" in json) {
              console.log("Success:", json);
              try {
                SecureStore.setItemAsync('userToken', json.token);
              } catch (e) {
                console.log("FAILED TO SET USERTOKEN")
              }
              dispatch({ type: ACTIONS.SIGN_IN, token: json.token });
            } else {
              // Invalid email/password. Raise form error.
              console.log("Invalid", json);
              Alert.alert(
                "Bad Data",
                "Fuck u bitch",
                json,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }
          })
          .catch((error) => {
            // Network error, server off or similar.
            console.error("Error:", error);
          });
      },
    }),
    []
  );
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                  title: 'Register',
                }}
              />
            </>
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
