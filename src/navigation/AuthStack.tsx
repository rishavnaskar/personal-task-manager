import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Login from "@/src/screens/Login";
import Signup from "@/src/screens/Signup";
import { SCREENS } from "@/src/utils/constants";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={SCREENS.LOGIN}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
            <Stack.Screen name={SCREENS.LOGIN} component={Login} />
        </Stack.Navigator>
    );
};

export default AuthStack;
