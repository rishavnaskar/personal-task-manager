import React from "react";

import { AuthUserProvider } from "@/src/navigation/AuthUserProvider";
import Navigator from "@/src/navigation/Router";
import { TasksProvider } from "@/src/navigation/TaskProvider";
import { ThemeProvider } from "@/src/navigation/ThemeProvider";

export default function Index() {
  return (
    <ThemeProvider>
      <AuthUserProvider>
        <TasksProvider>
          <Navigator />
        </TasksProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
}
