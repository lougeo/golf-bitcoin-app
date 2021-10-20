import React from 'react';
import { View, Button, TextInput, Text } from "react-native";
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
        console.log(data.username);
        console.log(data.password);
        let json = { "token": null };
        try {
          fetch('http://192.168.139.220:8000/api/auth/login/', {
            method: 'POST',
            headers: {
              // Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: data.username,
              password: data.password
            })
          })
            .then(response => response.json())
            .then(json => {
              console.log("Success:", json);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          
          // console.log("Maybe success", response);
          // const json = response.json();
          // console.log("Success", json);
        } catch (error) {
          console.error("ERROR", error);
        }

        dispatch({ type: ACTIONS.SIGN_IN, token: json.token });
      },
      signOut: () => dispatch({ type: ACTIONS.SIGN_OUT }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: ACTIONS.SIGN_IN, token: 'dummy-auth-token' });
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
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
