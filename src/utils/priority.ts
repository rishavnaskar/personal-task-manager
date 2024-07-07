import { ThemeColorPaletteType } from "@/src/utils/types";

/**
 * Sets the priority marker's color
 * @param {Number} priority
 */

export const priorityColor = (priority: number, theme: ThemeColorPaletteType | null) => {
    if (priority === 1) {
        return {
            backgroundColor: theme?.priority.high,
            borderColor: theme?.priority.high,
        };
    } else if (priority === 2) {
        return {
            backgroundColor: theme?.priority.mid,
            borderColor: theme?.priority.mid,
        };
    } else if (priority === 3) {
        return {
            backgroundColor: theme?.priority.low,
            borderColor: theme?.priority.low,
        };
    } else {
        return {
            backgroundColor: "white",
            borderColor: "white",
        };
    }
};

export const priorityTextColor = (priority: number, theme: ThemeColorPaletteType | null) => {
    if (priority === 1) {
        return {
            color: theme?.priority.high,
        };
    } else if (priority === 2) {
        return {
            color: theme?.priority.mid,
        };
    } else if (priority === 3) {
        return {
            color: theme?.priority.low,
        };
    } else {
        return {
            color: theme?.textColor,
        };
    }
};
