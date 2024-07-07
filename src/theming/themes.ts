import { ThemeColorPaletteType } from "@/src/utils/types";

export const lightTheme: ThemeColorPaletteType = {
    colorAccentPrimary: "#B1C9E5",
    colorAccentSecondary: "#B1C9E5",
    backgroundColor: "#FAFAFA",
    priority: {
        high: "#FF0000",
        mid: "orange",
        low: "#1E90FF"
    },
    textColor: "#484848",
    subTextColor: "#767676",
    chipColor: "#FFFFFF",
    iconColor: "#484848",
    delete: "#E53935",
    cardBackground: "#FFFFFF",
    bottomSheet: "#FFFFFF",
    cardIcon: "#B1C9E5",
    fabGroup: "#FFFFFF",
};

export const darkTheme: ThemeColorPaletteType = {
    colorAccentPrimary: "#242529",
    colorAccentSecondary: "#8D7DFA",
    backgroundColor: "#202125",
    priority: {
        high: "#FF0000",
        mid: "orange",
        low: "#3399FF"
    },
    textColor: "#FFFFFF",
    subTextColor: "rgba(255,255,255,0.7)",
    chipColor: "#FFFFFF",
    iconColor: "#FFFFFF",
    delete: "#E53935",
    cardBackground: "#242529",
    bottomSheet: "#242529",
    cardIcon: "#8D7DFA",
    fabGroup: "#3399ff",
};
