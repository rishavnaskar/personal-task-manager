import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

import { darkTheme, lightTheme } from "@/src/theming/themes";
import { ASYNC_STORAGE_KEYS } from "@/src/utils/constants";
import { ThemeContextType } from "@/src/utils/types";
import Snackbar from "react-native-snackbar";

export const ThemeContext = createContext<ThemeContextType>({ theme: null, toggleDarkMode: null });

export const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
    const [isDarkModeOn, setIsDarkModeOn] = useState(false);

    const handleToggleDarkMode = (previousVal: boolean) => {
        setIsDarkModeOn(!previousVal);
        AsyncStorage.setItem(ASYNC_STORAGE_KEYS.THEME, JSON.stringify(!previousVal));
        Snackbar.show({ text: previousVal ? 'Dark mode off' : 'Dark mode onpes' })
    };

    useEffect(() => {
        const getThemeData = async () => {
            try {
                const response = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.THEME)
                if (response) {
                    const isDarkModeEnabled = JSON.parse(response)
                    setIsDarkModeOn(isDarkModeEnabled)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getThemeData()
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                toggleDarkMode: () => handleToggleDarkMode(isDarkModeOn),
                theme: isDarkModeOn ? darkTheme : lightTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
