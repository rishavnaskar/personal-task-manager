import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";


import { TasksContext } from "@/src/navigation/TaskProvider";
import { ThemeContext } from "@/src/navigation/ThemeProvider";
import { SCREENS } from "@/src/utils/constants";
import { updateIsTaskCompleted } from "@/src/utils/helper";
import { priorityColor } from "@/src/utils/priority";
import { NavigationType, TaskItemType } from "@/src/utils/types";

interface Props {
    navigation: NavigationType,
    taskItem: TaskItemType,
    onToggleSnackBar: () => void,
    handleSetTaskId: (id: string) => void,
    onDismissSnackBar: () => void,
}

export default function TaskCard({
    taskItem,
    navigation,
    onToggleSnackBar,
    handleSetTaskId,
    onDismissSnackBar,
}: Props) {
    const { taskTitle, taskTime, taskContent, priorityIs, isCompleted, id } = taskItem;

    const [checked, setChecked] = useState(isCompleted);

    const { theme } = useContext(ThemeContext)
    const { setTasks } = useContext(TasksContext)

    const handleCompleted = async () => {
        setChecked(!checked);
        const tasksResponse = await updateIsTaskCompleted(!checked, id);
        if (tasksResponse) {
            if (!checked) {
                onToggleSnackBar();
                handleSetTaskId(id);
            } else {
                onDismissSnackBar();
            }
            setTasks(tasksResponse)
        } else {
            console.error('Failed to update', tasksResponse)
        }
    };

    useEffect(() => {
        setChecked(isCompleted)
    }, [isCompleted])

    return (
        <View style={styles.mainContainer}>
            <TouchableRipple
                borderless
                centered
                style={[
                    styles.taskListContainer,
                    { backgroundColor: theme?.cardBackground },
                ]}
                onPress={() => navigation.navigate(SCREENS.TASK_ITEM, {
                    ...taskItem, isCompleted: checked
                })}
                onLongPress={handleCompleted}
            >
                <View style={styles.taskListView}>
                    <Text
                        style={[
                            styles.taskItemTitle,
                            { color: theme?.textColor },
                            checked && {
                                textDecorationLine: "line-through",
                            },
                            taskContent === "" && {
                                paddingBottom: 10,
                            },
                            taskTime && {
                                paddingBottom: 0,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {taskTitle + "  "}
                        <View
                            style={[
                                priorityColor(priorityIs, theme),
                                {
                                    height: 10,
                                    width: 10,
                                    borderRadius: 50,
                                },
                            ]}
                        />
                    </Text>
                    {taskTime && (
                        <Text
                            style={[
                                styles.taskItemDate,
                                checked && {
                                    textDecorationLine: "line-through",
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {"Due " + moment(taskTime).calendar()}
                        </Text>
                    )}
                    {taskContent !== "" && (
                        <Text
                            style={[
                                styles.taskContent,
                                checked && {
                                    textDecorationLine: "line-through",
                                },
                                { color: theme?.subTextColor },
                            ]}
                        >
                            {taskContent}
                        </Text>
                    )}
                </View>
            </TouchableRipple>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: 5,
        marginHorizontal: 7,
    },
    taskListContainer: {
        borderRadius: 15,
        elevation: 2,
    },
    taskListView: {
        flex: 1,
        paddingVertical: 9,
    },
    taskItemTitle: {
        paddingTop: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    taskItemDate: {
        marginBottom: 5,
        paddingHorizontal: 20,
        fontSize: 14,
        color: "#767676",
    },
    taskContent: {
        marginBottom: 10,
        paddingHorizontal: 20,
        fontSize: 14,
        color: "#484848",
        lineHeight: 20,
    },
    priorityMarker: {
        position: "absolute",
        left: 65,
        top: 17,
    },

    rightChevronContainer: {
        position: "absolute",
        right: 25,
        top: 10,
    },
    rightChevron: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
    checkbox: {
        position: "absolute",
        left: 8,
        top: 14,
    },

    taskPriority: {
        marginTop: 5,
        width: 4,
        height: 40,
        borderRadius: 9999,
        borderWidth: 1,
    },
    checkBoxStyle: {
        borderRadius: 10,
        backgroundColor: "transparent",
        borderWidth: 0,
    },
});
