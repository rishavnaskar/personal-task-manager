import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import TaskList from "@/src/navigation/TasksNavigator";
import AddTask from "@/src/screens/AddTask/AddTask";
import SettingsScreen from "@/src/screens/More/Settings";
import { SCREENS } from "@/src/utils/constants";

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS.TASK_MONITOR} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.TASK_MONITOR} component={TaskList} />
            <Stack.Screen name={SCREENS.ADD_TASK} component={AddTask} />
            <Stack.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default AppStack;
