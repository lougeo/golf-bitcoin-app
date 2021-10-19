import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./SignInScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode="none">
        <RootStack.Screen 
            name="SignInScreen" 
            component={SignInScreen}
            // options={{
            //     title: 'Sign in',
            //     // When logging out, a pop animation feels intuitive
            //     animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            // }} 
        />
    </RootStack.Navigator>
)

export default RootStackScreen;
