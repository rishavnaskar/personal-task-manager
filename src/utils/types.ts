import { NavigationProp, NavigationState } from "@react-navigation/native";
import { Moment } from "moment";

export type NavigationType = Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & {
    getState(): NavigationState | undefined;
}

export type TaskItemType = {
    id: string
    isCompleted: boolean
    taskTitle: string
    taskContent?: string
    createdAt: Moment
    taskTime?: Moment
    priorityIs: number
    collaborators?: string[]
    isUpdated?: boolean
}
export type SortingOrderType = keyof TaskItemType

export type SortModeType = 'createdAt' | 'taskTime' | 'priorityIs'
export type SortOrderType = 'ascending' | 'descending'

export type SortingType = {
    sortMode: SortModeType // Pick<TaskItemType, 'createdAt' | 'taskTime' | 'priorityIs'>;
    sortOrder: SortOrderType
}

export type UserType = {
    email: string
    password: string
}

export type UserDataStoreType = {
    user: UserType,
    tasks: TaskItemType[]
}

export type AuthUserContextType = {
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

export type TasksContextType = {
    tasks: TaskItemType[] | null,
    setTasks: React.Dispatch<React.SetStateAction<TaskItemType[] | null>>
}

export type TaskListDisplayType = "fullcard" | "compact"

export type ThemeColorPaletteType = {
    colorAccentPrimary: string,
    colorAccentSecondary: string,
    backgroundColor: string,
    priority: {
        high: string,
        mid: string,
        low: string
    },
    textColor: string,
    subTextColor: string,
    chipColor: string,
    iconColor: string,
    delete: string,
    cardBackground: string,
    bottomSheet: string,
    cardIcon: string,
    fabGroup: string,
}

export type ThemeContextType = {
    theme: ThemeColorPaletteType | null
    toggleDarkMode: (() => void) | null
}