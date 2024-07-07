import React, { useContext } from "react";
import { Appbar } from "react-native-paper";

import { ThemeContext } from "@/src/navigation/ThemeProvider";
import { SCREENS } from "@/src/utils/constants";
import { NavigationType } from "@/src/utils/types";

interface Props {
    navigation: NavigationType;
    handleSlider: () => void;
}

const Header = ({ navigation, handleSlider }: Props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <Appbar.Header style={{ backgroundColor: theme?.colorAccentPrimary }}>
            <Appbar.Content title={SCREENS.YOUR_TASKS} color={theme?.textColor} />
            <Appbar.Action
                icon="filter-variant"
                color={theme?.iconColor}
                onPress={handleSlider}
            />
            <Appbar.Action
                icon="cog-outline"
                color={theme?.iconColor}
                onPress={() => navigation.navigate(SCREENS.SETTINGS)}
            />
        </Appbar.Header>
    );
};

export default Header;
