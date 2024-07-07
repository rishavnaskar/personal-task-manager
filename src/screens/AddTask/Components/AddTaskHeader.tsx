import React from "react";
import { Appbar } from "react-native-paper";

import { NavigationType, ThemeColorPaletteType } from "@/src/utils/types";

interface Props {
    navigation: NavigationType
    theme: ThemeColorPaletteType | null
    showPicker: () => void
    handleAddTask: () => Promise<void>
    clearFields: () => void
    showModal: () => void
}

const AddTaskHeader = ({
    navigation,
    theme,
    showPicker,
    handleAddTask,
    clearFields,
    showModal,
}: Props) => {
    return (
        <Appbar.Header style={{ backgroundColor: theme?.colorAccentPrimary }}>
            <Appbar.BackAction
                iconColor={theme?.textColor}
                onPress={() => {
                    navigation.goBack();
                    clearFields();
                }}
            />
            <Appbar.Content title="Add Task" color={theme?.textColor} />
            <Appbar.Action icon="filter-variant" iconColor={theme?.textColor} onPress={showModal} />
            <Appbar.Action icon="alarm" iconColor={theme?.textColor} onPress={showPicker} />
            <Appbar.Action
                icon="check"
                iconColor={theme?.textColor}
                onPress={handleAddTask}
            />
        </Appbar.Header>
    );
};

export default AddTaskHeader;
