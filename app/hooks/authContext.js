import React from 'react';
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

// Convert this to a function

// const authContext = React.useMemo(
// () => ({
//     signIn: async (data) => {
//     console.log(data.email);
//     console.log(data.password);
//     fetch('http://192.168.139.220:8000/api/auth/login/', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//         email: data.email,
//         password: data.password
//         })
//     })
//         .then(response => response.json())
//         .then(json => {
//         if ("token" in json) {
//             console.log("Success:", json);
//             try {
//             SecureStore.setItemAsync('userToken', json.token);
//             } catch (e) {
//             console.log("FAILED TO SET USERTOKEN")
//             }
//             dispatch({ type: ACTIONS.SIGN_IN, token: json.token });
//         } else {
//             // Invalid email/password. Raise form error.
//             console.log("Invalid", json);
//             Alert.alert(
//             "Bad Data",
//             "Fuck u bitch",
//             [
//                 {
//                 text: "Cancel",
//                 onPress: () => console.log("Cancel Pressed"),
//                 style: "cancel"
//                 },
//                 { text: "OK", onPress: () => console.log("OK Pressed") }
//             ]
//             );
//         }
//         })
//         .catch((error) => {
//         // Network error, server off or similar.
//         console.error("Error:", error);
//         });
//     },
//     signOut: async () => {
//     let userToken;

//     try {
//         userToken = await SecureStore.getItemAsync('userToken');
//     } catch (e) {
//         console.log("FAILED TO GET USERTOKEN")
//     }
//     fetch('http://192.168.139.220:8000/api/auth/logout/', {
//         method: 'POST',
//         headers: {
//         'Authorization': 'Token ' + userToken
//         }
//     })
//         .then(response => {
//         if (response.ok) {
//             try {
//             SecureStore.deleteItemAsync('userToken');
//             } catch (e) {
//             console.log("FAILED TO DELETE USERTOKEN")
//             }
//             dispatch({ type: ACTIONS.SIGN_OUT })
//         } else {
//             console.log("Response error: ", response);
//         }
//         })
//         .catch((error) => {
//         // Network error, server off or similar.
//         console.error("Error:", error);
//         });
//     },
//     register: async (data) => {
//     console.log(data.email);
//     console.log(data.password);
//     console.log(data.password_confirm);
//     fetch('http://192.168.139.220:8000/api/auth/register/', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//         email: data.email,
//         password: data.password,
//         password_confirm: data.password_confirm,
//         })
//     })
//         .then(response => response.json())
//         .then(json => {
//         if ("token" in json) {
//             console.log("Success:", json);
//             try {
//             SecureStore.setItemAsync('userToken', json.token);
//             } catch (e) {
//             console.log("FAILED TO SET USERTOKEN")
//             }
//             dispatch({ type: ACTIONS.SIGN_IN, token: json.token });
//         } else {
//             // Invalid email/password. Raise form error.
//             console.log("Invalid", json);
//             Alert.alert(
//             "Bad Data",
//             "Fuck u bitch",
//             json,
//             [
//                 {
//                 text: "Cancel",
//                 onPress: () => console.log("Cancel Pressed"),
//                 style: "cancel"
//                 },
//                 { text: "OK", onPress: () => console.log("OK Pressed") }
//             ]
//             );
//         }
//         })
//         .catch((error) => {
//         // Network error, server off or similar.
//         console.error("Error:", error);
//         });
//     },
// }),
// []
// );
