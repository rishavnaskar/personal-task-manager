import React, { createContext, useState } from "react";

import { TaskItemType, TasksContextType } from "@/src/utils/types";

export const TasksContext =
    createContext<TasksContextType>({ tasks: null, setTasks: () => null });

export const TasksProvider = ({ children }: { children: React.ReactElement }) => {
    const [tasks, setTasks] = useState<TaskItemType[] | null>(null);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};
