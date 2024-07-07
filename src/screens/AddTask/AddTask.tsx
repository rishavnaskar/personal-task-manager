import moment from "moment";
import React, { useContext, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Provider,
    RadioButton
} from "react-native-paper";
import Snackbar from "react-native-snackbar";
import BottomSheet from "rn-sliding-up-panel";

import { ThemeContext } from "@/src/navigation/ThemeProvider";
import Appbar from "@/src/screens/AddTask/Components/AddTaskHeader";
import Colors from "@/src/theming/colors";
import { addTask, getRandomId } from "@/src/utils/helper";
import { NavigationType } from "@/src/utils/types";

export default function AddTask({ navigation }: { navigation: NavigationType }) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskContent, setNewTaskContent] = useState("");
    const [priority, setPriority] = useState(2);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [chosenDate, setChosenDate] = useState<Date | null>(null);

    const bottomSheetRef = useRef<BottomSheet>(null)

    const { theme } = useContext(ThemeContext);

    const showDialog = () => {
        bottomSheetRef.current?.show({ toValue: 220, velocity: 0.8 })
    }

    const handleAddTask = async () => {
        if (newTaskTitle === "") {
            Snackbar.show({ text: "Please fill all the details" });
        } else {
            const response = await addTask({
                taskTitle: newTaskTitle,
                taskContent: newTaskContent,
                priorityIs: priority,
                collaborators: [],
                createdAt: moment(),
                id: getRandomId(),
                isCompleted: false,
                isUpdated: false,
                taskTime: moment(chosenDate)
            });
            if (response) {
                Snackbar.show({ text: "Task Added" })
                clearFields();
                navigation.goBack();
            } else {
                Snackbar.show({ text: "Cannot add task at this moment. Please try again later..." })
            }
        }
    };

    const clearFields = () => {
        setNewTaskTitle("");
        setNewTaskContent("");
        setChosenDate(null);
    };

    const handlePicker = (date: Date) => {
        setChosenDate(date);
        setIsDatePickerVisible(false);
    };
    const showPicker = () => setIsDatePickerVisible(true);

    const hidePicker = () => setIsDatePickerVisible(false);

    return (
        <Provider>
            <Appbar
                navigation={navigation}
                theme={theme}
                showPicker={showPicker}
                handleAddTask={handleAddTask}
                clearFields={clearFields}
                showModal={showDialog}
            />
            <View
                style={[
                    styles.mainContainer,
                    { backgroundColor: theme?.backgroundColor },
                ]}
            >
                <View style={{ flex: 1 }}>
                    <TextInput
                        multiline={true}
                        style={[styles.titleInput, { color: theme?.textColor }]}
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
                            { color: theme?.textColor },
                        ]}
                        onChangeText={(text) => setNewTaskContent(text)}
                        placeholder="Content"
                        defaultValue={newTaskContent}
                        multiline={true}
                        placeholderTextColor={theme?.subTextColor}
                    />
                </View>
                <DateTimePickerModal
                    mode="datetime"
                    isVisible={isDatePickerVisible}
                    is24Hour={false}
                    onConfirm={handlePicker}
                    onCancel={hidePicker}
                />
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                draggableRange={{ top: 210, bottom: 0 }}
                snappingPoints={[0, 120, 280]}
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
        color: Colors.accentColor,
        paddingHorizontal: 20,
        // paddingBottom: 5,
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
});
