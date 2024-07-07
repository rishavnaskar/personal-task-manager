import React, { useContext } from "react";
import { Clipboard } from "react-native";
import { Appbar, Divider, List } from "react-native-paper";
import Snackbar from "react-native-snackbar";

import { AuthUserContext } from "@/src/navigation/AuthUserProvider";
import { ThemeContext } from "@/src/navigation/ThemeProvider";
import { SCREENS } from "@/src/utils/constants";
import { addSampleData, logout } from "@/src/utils/helper";
import { NavigationType } from "@/src/utils/types";

const SettingsScreen = ({ navigation }: { navigation: NavigationType }) => {
    const { theme, toggleDarkMode } = useContext(ThemeContext);
    const { user, setUser } = useContext(AuthUserContext)

    const logoutHelper = async () => {
        try {
            const response = await logout();
            if (response) {
                setUser(null);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onPressAddSampleTask = async () => {
        await addSampleData();
        navigation.goBack();
    }

    const onPressCopy = () => {
        if (user?.email) {
            Clipboard.setString(user?.email)
            Snackbar.show({ text: 'Email copied!' })
        } else {
            Snackbar.show({ text: 'Failed to copy email' })
        }
    }

    return (
        <>
            <Appbar.Header
                style={{ backgroundColor: theme?.colorAccentPrimary }}
            >
                <Appbar.BackAction
                    iconColor={theme?.textColor}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title={SCREENS.SETTINGS} color={theme?.textColor} />
            </Appbar.Header>
            <List.Section
                style={{
                    flex: 1,
                    marginVertical: 0,
                    backgroundColor: theme?.backgroundColor,
                }}
            >
                <List.Subheader
                    style={{
                        color: theme?.colorAccentSecondary,
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    General
                </List.Subheader>
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title="Dark Mode"
                    titleStyle={{ color: theme?.textColor }}
                    right={() => (
                        <List.Icon
                            color={theme?.colorAccentSecondary}
                            icon="theme-light-dark"
                        />
                    )}
                    onPress={() => toggleDarkMode?.()}
                />
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title="Add sample task"
                    titleStyle={{ color: theme?.textColor }}
                    right={() => (
                        <List.Icon
                            color={theme?.colorAccentSecondary}
                            icon="playlist-plus"
                        />
                    )}
                    onPress={onPressAddSampleTask}
                />
                <Divider />
                <List.Subheader
                    style={{
                        color: theme?.colorAccentSecondary,
                        paddingTop: 20,
                        paddingBottom: 5,
                    }}
                >
                    Account
                </List.Subheader>
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title={user?.email}
                    titleStyle={{ color: theme?.textColor }}
                    right={() => (
                        <List.Icon
                            color={theme?.colorAccentSecondary}
                            icon="content-duplicate"
                        />
                    )}
                    onPress={onPressCopy}
                />
                <List.Item
                    style={{ paddingVertical: 0 }}
                    title="Logout"
                    titleStyle={{ color: theme?.textColor }}
                    right={() => (
                        <List.Icon
                            color={theme?.colorAccentSecondary}
                            icon="logout-variant"
                        />
                    )}
                    onPress={logoutHelper}
                />
            </List.Section>
        </>
    );
};

export default SettingsScreen;
