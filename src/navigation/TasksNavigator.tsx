import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";

import EditTask from "@/src/screens/EditTask";
import TaskItem from "@/src/screens/TaskItem/TaskItem";
import TaskList from "@/src/screens/TaskList/Tasks";
import { SCREENS } from "@/src/utils/constants";

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.YOUR_TASKS} component={TaskList} />
            <Stack.Screen name={SCREENS.TASK_ITEM} component={TaskItem} />
            <Stack.Screen name={SCREENS.EDIT_TASK} component={EditTask} />
        </Stack.Navigator>
    );
}

export default StackNavigator;
