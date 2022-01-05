import React from 'react';
import { Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './app/screens/SplashScreen';
import SignInScreen from './app/screens/SignInScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import CourseListScreen from './app/screens/CourseListScreen';
import CourseDetailScreen from './app/screens/CourseDetailScreen';
import { AuthContext } from './app/providers/AuthContext';
import authSwitch, { initialState, ACTIONS } from './app/hooks/authSwitch';
import { base_url } from './app/Globals';

import Root from './app/screens/RootStackNavigator';


const Stack = createNativeStackNavigator();


export default function App() {

  const [state, dispatch] = React.useReducer(authSwitch, initialState);
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
        userToken = null;
      }
      
      if (userToken == null) {
        dispatch({ type: ACTIONS.RESTORE_TOKEN, token: userToken });
      } else {
        fetch(base_url + 'api/auth/user/', {
          method: 'GET',
          headers: {
            'Authorization': 'Token ' + userToken
          }
        })
          .then(response => {
            if (response.ok) {
              // Success
              dispatch({ type: ACTIONS.RESTORE_TOKEN, token: userToken });
            } else {
              // Invalid token, log user out
              try {
                SecureStore.deleteItemAsync('userToken');
              } catch (e) {
                console.error(e)
              }

              dispatch({ type: ACTIONS.RESTORE_TOKEN, token: null });
            }
          })
          .catch((error) => {
            // Network error, server off or similar.
            dispatch({ type: ACTIONS.RESTORE_TOKEN, token: null });
          });
      }
    };

    bootstrapAsync();
  }, []);
  
  const authContext = React.useMemo(
    () => ({
      ...state,
      signIn: async (data) => {
        fetch(base_url + 'api/auth/login/', {
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
        fetch(base_url + 'api/auth/logout/', {
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
              dispatch({ type: ACTIONS.SIGN_OUT });
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
        fetch(base_url + 'api/auth/register/', {
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
    [state]
  );
  
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
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
              // Start on a bottom tab navigation, and then on if clicked on a thing, go out of that and have a back button that goes back to initial tab nav
              <>
                <Stack.Screen name="Root" component={Root} />
                <Stack.Screen name="CourseList" component={CourseListScreen} />
                <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
