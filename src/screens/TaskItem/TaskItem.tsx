import moment from "moment";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
    Appbar,
    Button,
    Dialog,
    FAB,
    Portal,
    Provider
} from "react-native-paper";

import { ThemeContext } from "@/src/navigation/ThemeProvider";
import { SCREENS } from "@/src/utils/constants";
import { deleteTask } from "@/src/utils/helper";
import { NavigationType, TaskItemType } from "@/src/utils/types";

interface Props {
    navigation: NavigationType
    route: { params: TaskItemType }
}

export default function TaskItem({ route, navigation }: Props) {
    const {
        id,
        taskTitle,
        taskContent,
        taskTime,
        isCompleted,
        isUpdated,
        createdAt,
    } = route?.params ?? {};


    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const { theme } = useContext(ThemeContext);

    const onStateChange = () => setOpen(!open);

    const handleDivider = () => {
        if (taskTime || taskContent !== "") {
            return { borderBottomWidth: 1, borderBottomColor: "#E8E8E8" };
        }
    };

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleDelete = async (id: string) => {
        const response = await deleteTask(id);
        if (response) {
            hideDialog();
        } else {
            console.error('Failed to delete')
        }
    };

    return (
        <Provider>
            <Appbar.Header
                style={{ backgroundColor: theme?.colorAccentPrimary }}
            >
                <Appbar.BackAction
                    color={theme?.textColor}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="Task Item" color={theme?.textColor} />
            </Appbar.Header>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={hideDialog}
                    style={{
                        backgroundColor: theme?.backgroundColor,
                        width: 320,
                        alignSelf: "center",
                        borderRadius: 15,
                    }}
                >
                    <Dialog.Content>
                        <Text style={{ fontSize: 16, color: theme?.textColor }}>
                            The note will be deleted
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={hideDialog}
                            color={theme?.colorAccentSecondary}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={() => handleDelete(id)}
                            color={theme?.colorAccentSecondary}
                        >
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={{ flex: 1, backgroundColor: theme?.backgroundColor }}>
                <ScrollView
                    style={[
                        styles.mainContainer,
                        { backgroundColor: theme?.cardBackground },
                        taskContent === "" && { paddingBottom: 15 },
                    ]}
                >
                    <View style={handleDivider()}>
                        <Text
                            style={[
                                styles.taskTitle,
                                isCompleted && {
                                    textDecorationLine: "line-through",
                                },
                                {
                                    color: theme?.textColor,
                                },
                            ]}
                        >
                            {taskTitle}
                        </Text>
                    </View>
                    {taskTime && (
                        <View>
                            <Text
                                style={[
                                    styles.taskDate,
                                    { color: theme?.textColor },
                                ]}
                            >
                                Due {moment(taskTime).calendar()}
                            </Text>
                        </View>
                    )}
                    {taskContent !== "" && (
                        <View>
                            <Text
                                style={[
                                    styles.taskContent,
                                    !taskTime && { paddingTop: 10 },
                                    {
                                        color: theme?.subTextColor,
                                    },
                                ]}
                            >
                                {taskContent}
                            </Text>
                        </View>
                    )}
                    <View>
                        <Text style={[
                            styles.createdDate,
                            { color: theme?.subTextColor }
                        ]}>
                            {isUpdated ? "Updated on " : "Created on"}
                            {moment(createdAt).calendar()}
                        </Text>
                    </View>
                </ScrollView>
                <Portal>
                    <FAB.Group
                        visible={true}
                        open={open}
                        color="white"
                        fabStyle={{
                            backgroundColor: theme?.colorAccentSecondary,
                        }}
                        icon={open ? "dots-vertical" : "dots-horizontal"}
                        backdropColor={'rgba(32, 33, 37, 0.7)'}
                        actions={[

                            {
                                icon: "trash-can-outline",
                                color: theme?.colorAccentSecondary,
                                label: "Delete",
                                onPress: showDialog,
                                style: {
                                    backgroundColor: theme?.backgroundColor,
                                },
                            },
                            {
                                icon: "pencil",
                                label: "Edit",
                                color: theme?.colorAccentSecondary,
                                onPress: () =>
                                    navigation.navigate(SCREENS.EDIT_TASK, route.params),
                                style: {
                                    backgroundColor: theme?.backgroundColor,
                                },
                            },
                        ]}
                        onStateChange={onStateChange}
                    />
                </Portal>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        margin: 10,
        paddingHorizontal: 20,
        paddingTop: 15,
        elevation: 2,
        borderRadius: 15,
    },
    taskTitle: {
        fontWeight: "700",
        fontSize: 36,
        paddingTop: 5,
        paddingBottom: 10,
    },
    taskDate: {
        paddingVertical: 10,
        fontSize: 14,
    },
    createdDate: {
        marginVertical: 10,
        paddingBottom: 20,
        fontSize: 14,
    },
    taskContent: {
        fontSize: 18,
        lineHeight: 29,
        paddingBottom: 15,
    },
});
