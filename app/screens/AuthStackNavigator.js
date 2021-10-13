import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    </RootStack.Navigator>
)

export default RootStackScreen;
