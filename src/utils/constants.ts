export const ASYNC_STORAGE_KEYS = {
    USERS: 'users',
    LOGIN: 'login',
    THEME: '@theme'
};

export const TASK_SCREENS = {
    TASK_MONITOR: 'Task Monitor',
    ADD_TASK: 'Add Task',
    SETTINGS: 'Settings'
}

export const TASK_LIST_SCREENS = {
    YOUR_TASKS: "Your Tasks",
    TASK_ITEM: "Task Item",
    EDIT_TASK: "EditTask"
}

export const AUTH_SCREENS = {
    SIGNUP: 'Signup',
    LOGIN: 'Login'
}

export const SCREENS = {
    ...TASK_LIST_SCREENS,
    ...TASK_SCREENS,
    ...AUTH_SCREENS
};

export const EVENT_NAMES = {
    GET_ALL_TASKS: 'GetAllTasks'
}