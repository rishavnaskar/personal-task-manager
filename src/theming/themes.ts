import { ThemeColorPaletteType } from "@/src/utils/types";

export const lightTheme: ThemeColorPaletteType = {
    colorAccentPrimary: "#118086",
    colorAccentSecondary: "#118086",
    backgroundColor: "#FAFAFA",
    priority: {
        high: "#FF0000",
        mid: "orange",
        low: "#1E90FF"
    },
    textColor: "#484848",
    subTextColor: "#767676",
    chipColor: "#FFFFFF",
    iconColor: "#118086",
    delete: "#E53935",
    cardBackground: "#FFFFFF",
    bottomSheet: "#FFFFFF",
    cardIcon: "#118086",
    fabGroup: "#FFFFFF",
};

export const darkTheme: ThemeColorPaletteType = {
    colorAccentPrimary: "#242529",
    colorAccentSecondary: "#3399FF",
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
    cardIcon: "rgba(255,255,255,0.9)",
    fabGroup: "#3399ff",
};
