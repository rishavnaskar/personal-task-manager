import moment from "moment";
import React, { useContext, useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Appbar,
    Provider,
    RadioButton,
    Switch,
    TouchableRipple
} from "react-native-paper";
import Snackbar from "react-native-snackbar";
import { default as BottomSheet, default as SlidingUpPanel } from "rn-sliding-up-panel";

import { ThemeContext } from "@/src/navigation/ThemeProvider";
import { updateTask } from "@/src/utils/helper";
import { NavigationType, TaskItemType } from "@/src/utils/types";


interface Props {
    navigation: NavigationType;
    route: { params: TaskItemType }
}

export default function EditTask({ route, navigation }: Props) {
    const taskProps = route.params;
    const {
        taskTitle,
        taskTime,
        taskContent,
        isCompleted,
        priorityIs,
    } = taskProps

    const { theme } = useContext(ThemeContext);

    const [newTaskTitle, setNewTaskTitle] = useState(taskTitle);
    const [newTaskContent, setNewTaskContent] = useState(taskContent);
    const [isChecked, setIsChecked] = useState(isCompleted);
    const [isVisible, setIsVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState(taskTime);
    const [priority, setPriority] = useState(priorityIs);

    const bottomSheetRef = useRef<SlidingUpPanel>(null);

    const handleIsCompleted = (isChecked: boolean) => setIsChecked(!isChecked);

    const handlePicker = (date: Date) => {
        setChosenDate(moment(date));
        setIsVisible(false);
    };

    const showPicker = () => setIsVisible(true);

    const hidePicker = () => setIsVisible(false);

    const handleEditTask = async () => {
        if (newTaskTitle === "") {
            Snackbar.show({ text: "Please fill all the details" });
        } else {
            const response = await updateTask({
                ...taskProps,
                taskTitle: newTaskTitle,
                taskContent: newTaskContent,
                priorityIs: priority,
                taskTime: chosenDate,
                isCompleted: isChecked,
            })
            if (response) {
                Snackbar.show({ text: 'Task Updated' })
                navigation.pop(2)
            } else {
                Snackbar.show({ text: "Cannot edit this task at this moment. Please try again later..." })
            }
        }
    };

    return (
        <Provider>
            <Appbar.Header
                style={{ backgroundColor: theme?.colorAccentPrimary }}
            >
                <Appbar.BackAction
                    iconColor={theme?.iconColor}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="Edit Task" color={theme?.textColor} />
                <Appbar.Action icon="filter-variant" iconColor={theme?.iconColor} onPress={() => {
                    bottomSheetRef.current?.show({ toValue: 300, velocity: 0.6 });
                }} />
                <Appbar.Action icon="alarm" iconColor={theme?.iconColor} onPress={showPicker} />
                <Appbar.Action
                    icon="check"
                    iconColor={theme?.iconColor}
                    onPress={handleEditTask}
                />
            </Appbar.Header>
            <View
                style={[
                    styles.mainContainer,
                    { backgroundColor: theme?.backgroundColor },
                ]}
            >
                <ScrollView>
                    <TextInput
                        multiline={true}
                        style={[
                            styles.titleInput,
                            {
                                color: theme?.textColor,
                                textDecorationLine: isChecked ? 'line-through' : 'none'
                            },
                        ]}
                        placeholder="Title"
                        onChangeText={(text) => setNewTaskTitle(text)}
                        defaultValue={newTaskTitle}
                        placeholderTextColor={theme?.subTextColor}
                    />
                    <Text
                        onPress={showPicker}
                        style={[
                            styles.dateInput,
                            { color: theme?.subTextColor },
                        ]}
                    >
                        {chosenDate
                            ? moment(chosenDate).calendar()
                            : "Reminder Time"}
                    </Text>
                    <TextInput
                        style={[
                            styles.contentInput,
                            { color: theme?.subTextColor },
                        ]}
                        onChangeText={(text) => setNewTaskContent(text)}
                        placeholder="Content"
                        defaultValue={newTaskContent}
                        multiline={true}
                        spellCheck={false}
                        placeholderTextColor={theme?.subTextColor}

                    />
                </ScrollView>
                <DateTimePickerModal
                    isVisible={isVisible}
                    onConfirm={handlePicker}
                    onCancel={hidePicker}
                    mode="datetime"
                    is24Hour={false}
                />
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                draggableRange={{ top: 300, bottom: 0 }}
                snappingPoints={[0, 220, 300]}
                showBackdrop={true}
            >
                <View
                    style={[
                        styles.bottomSheetContainer,
                        { backgroundColor: theme?.bottomSheet },
                    ]}
                >
                    <View style={styles.indicator} />
                    <Text
                        style={[
                            styles.priorityHeading,
                            { color: theme?.colorAccentSecondary },
                        ]}
                    >
                        Completed
                    </Text>
                    <TouchableRipple
                        style={[
                            styles.setPriority,
                            { paddingRight: 35, paddingVertical: 10 },
                        ]}
                        onPress={() => handleIsCompleted(isChecked)}
                    >
                        <>
                            <Text
                                style={{ fontSize: 15, color: theme?.textColor }}
                            >
                                Set completed
                            </Text>
                            <Switch
                                value={isChecked}
                                onValueChange={() =>
                                    handleIsCompleted(isChecked)
                                }
                                color={theme?.colorAccentSecondary}
                            />
                        </>
                    </TouchableRipple>
                    <Text
                        style={[
                            styles.priorityHeading,
                            { color: theme?.colorAccentSecondary },
                        ]}
                    >
                        Priority
                    </Text>
                    <RadioButton.Group
                        onValueChange={(newValue) => setPriority(+newValue)}
                        value={priority.toString()}
                    >
                        <RadioButton.Item
                            label="High"
                            value={'1'}
                            color={theme?.priority.high}
                            uncheckedColor={theme?.priority.high}
                            style={{ paddingHorizontal: 20, paddingRight: 35 }}
                            labelStyle={{ color: theme?.textColor }}
                        />
                        <RadioButton.Item
                            label="Medium"
                            value={'2'}
                            color={theme?.priority.mid}
                            uncheckedColor={theme?.priority.mid}
                            style={{ paddingHorizontal: 20, paddingRight: 35 }}
                            labelStyle={{ color: theme?.textColor }}
                        />
                        <RadioButton.Item
                            label="Low"
                            value={'3'}
                            color={theme?.priority.low}
                            uncheckedColor={theme?.priority.low}
                            style={{ paddingHorizontal: 20, paddingRight: 35 }}
                            labelStyle={{ color: theme?.textColor }}
                        />
                    </RadioButton.Group>
                </View>
            </BottomSheet>
        </Provider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
    },
    dateInput: { marginHorizontal: 10, paddingTop: 5 },
    titleInput: {
        fontSize: 30,
        fontWeight: "bold",
        paddingVertical: 15,
        marginHorizontal: 10,
        borderBottomWidth: 1.2,
        borderBottomColor: "#E8E8E8",
    },
    contentInput: {
        paddingTop: 10,
        marginHorizontal: 10,
        fontSize: 18,
        lineHeight: 29,
    },
    checkBox: {
        borderRadius: 10,
        borderWidth: 0,
    },
    bottomSheetContainer: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 10,
    },
    priorityHeading: {
        fontWeight: "bold",
        fontSize: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    setPriority: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    indicator: {
        position: "absolute",
        justifyContent: "center",
        alignSelf: "center",
        width: 40,
        height: 5,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: 25,
        top: 7,
    },
    setCompleted: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
